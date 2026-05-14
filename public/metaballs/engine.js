const gridWidth = 100;
const numPoints = gridWidth * gridWidth;

async function createShaderModule(device, id) {
    const shaderText = document.getElementById(id).textContent;
    return device.createShaderModule({
        code: shaderText
    })
}

async function init() {
    if (!navigator.gpu) {
        throw new Error("WebGPU not supported!");
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
        throw new Error("No appropriate GPUAdapter found!");
    }

    const device = await adapter.requestDevice();
    const clearColor = { r: 0.03, g: 0.03, b: 0.05, a: 0.0 };

    const shaderModule = await createShaderModule(device, "shader");

    const canvas = document.getElementById("canvas");

    // Snap canvas resolution to a multiple of gridWidth so every cell
    // maps to the same integer number of pixels (no uneven rasterization).
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(canvas.clientWidth * dpr / gridWidth) * gridWidth;
    canvas.height = Math.floor(canvas.clientHeight * dpr / gridWidth) * gridWidth;

    const context = canvas.getContext("webgpu")

    context.configure({
        device: device,
        format: navigator.gpu.getPreferredCanvasFormat(),
        alphaMode: "premultiplied"
    })

    const uniformBufferSize = 176; // grid_width + padding (16) + 10 * circle(16)
    const uniformBuffer = device.createBuffer({
        size: uniformBufferSize,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: shaderModule,
            entryPoint: "vertex_main",
        },
        fragment: {
            module: shaderModule,
            entryPoint: "fragment_main",
            targets: [{
                format: navigator.gpu.getPreferredCanvasFormat(),
            }],
        },
        primitive: {
            topology: "triangle-list",
        },
    });

    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{
            binding: 0,
            resource: {
                buffer: uniformBuffer,
            }
        }]
    });

    let startTime = performance.now();
    let velocities = [];
    for (let i = 0; i < 10; i++) {
        velocities.push([(Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01]);
    }
    let positions = [];
    for (let i = 0; i < 10; i++) {
        positions.push([(Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2]);
    }
    let radii = [];
    for (let i = 0; i < 10; i++) {
        radii.push(Math.min(Math.max(0.15, Math.random() * 0.3)), 0.25)
    }

    function frame() {
        const time = (performance.now() - startTime) / 1000;

        // Update uniform data for the frame
        const uniformData = new ArrayBuffer(uniformBufferSize);
        const uniformDataView = new DataView(uniformData);

        uniformDataView.setUint32(0, gridWidth, true);

        // Animate 10 circles
        for (let i = 0; i < 5; i++) {
            const offset = 16 + (i * 16);

            // Pulsing radii
            const r = radii[i] + Math.sin(time * 2.0 + i) * 0.03;

            positions[i][0] += velocities[i][0];
            positions[i][1] += velocities[i][1];

            if (Math.abs(positions[i][0]) + r > 1) {
                velocities[i][0] *= -1;
            }
            if (Math.abs(positions[i][1]) + r > 1) {
                velocities[i][1] *= -1;
            }

            uniformDataView.setFloat32(offset, positions[i][0], true);
            uniformDataView.setFloat32(offset + 4, positions[i][1], true);
            uniformDataView.setFloat32(offset + 8, r, true);
        }

        device.queue.writeBuffer(uniformBuffer, 0, uniformData);

        const commandEncoder = device.createCommandEncoder();

        const renderPassDescriptor = {
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                clearValue: clearColor,
                loadOp: "clear",
                storeOp: "store",
            }],
        };

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.setBindGroup(0, bindGroup);
        // 2 line segments per cell × 6 verts per quad = 12 verts/cell
        passEncoder.draw(numPoints * 12, 1, 0, 0);
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

init();