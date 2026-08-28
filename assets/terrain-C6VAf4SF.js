import"./modulepreload-polyfill-B5Qt9EMX.js";function D(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}function x(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function y(t){let e=Math.hypot(t[0],t[1],t[2]);return e&&(e=1/e,t[0]*=e,t[1]*=e,t[2]*=e),t}function h(){const t=new Float32Array(16);return t[0]=t[5]=t[10]=t[15]=1,t}function g(t,e,n){for(let r=0;r<4;r++){const s=e[r],o=e[r+4],i=e[r+8],a=e[r+12];t[r]=s*n[0]+o*n[1]+i*n[2]+a*n[3],t[r+4]=s*n[4]+o*n[5]+i*n[6]+a*n[7],t[r+8]=s*n[8]+o*n[9]+i*n[10]+a*n[11],t[r+12]=s*n[12]+o*n[13]+i*n[14]+a*n[15]}return t}function O(t,e,n,r,s){const o=1/Math.tan(e/2),i=1/(r-s);return t.fill(0),t[0]=o/n,t[5]=o,t[10]=(s+r)*i,t[11]=-1,t[14]=2*s*r*i,t}function T(t,e,n,r){let s,o,i;return i=y([e[0]-n[0],e[1]-n[1],e[2]-n[2]]),s=y(D(r,i)),o=y(D(i,s)),t[0]=s[0],t[1]=o[0],t[2]=i[0],t[3]=0,t[4]=s[1],t[5]=o[1],t[6]=i[1],t[7]=0,t[8]=s[2],t[9]=o[2],t[10]=i[2],t[11]=0,t[12]=-x(s,e),t[13]=-x(o,e),t[14]=-x(i,e),t[15]=1,t}function _(t,e,n){const r=Math.sin(n),s=Math.cos(n),o=h();return o[5]=s,o[6]=r,o[9]=-r,o[10]=s,g(t,e,o)}function E(t,e,n){const r=Math.sin(n),s=Math.cos(n),o=h();return o[0]=s,o[2]=-r,o[8]=r,o[10]=s,g(t,e,o)}function M(t,e){const n=e[0],r=e[1],s=e[2],o=e[4],i=e[5],a=e[6],c=e[8],d=e[9],l=e[10],f=1/(n*(i*l-d*a)-o*(r*l-d*s)+c*(r*a-i*s));return t.fill(0),t[0]=(i*l-d*a)*f,t[1]=-(o*l-c*a)*f,t[2]=(o*d-c*i)*f,t[4]=-(r*l-d*s)*f,t[5]=(n*l-c*s)*f,t[6]=-(n*d-c*r)*f,t[8]=(r*a-i*s)*f,t[9]=-(n*a-o*s)*f,t[10]=(n*i-o*r)*f,t[15]=1,t}const I=`struct VertexIn {
    @location(0) position : vec3f,
    @location(1) normal : vec3f,
    @location(2) color : vec3f
}

struct VertexOut {
    @builtin(position) position : vec4f,
    @location(0) vDot : f32,
    @location(1) color : vec3f
}

struct Uniforms {
    mvp : mat4x4f,
    lightDir : vec3f,
    _pad0 : f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn vertex_main(in: VertexIn) -> VertexOut
{
    let transNormal = normalize((uniforms.mvp * vec4f(in.normal, 0.0)).xyz);

    var output : VertexOut;
    output.position = uniforms.mvp * vec4f(in.position, 1.0f);
    output.vDot = max(dot(transNormal, normalize(uniforms.lightDir)), 0.0);
    output.color = in.color;

    return output;
}

@fragment
fn fragment_main(fragData: VertexOut) -> @location(0) vec4f
{
    var ambient = 0.2;
    var lighting = ambient + (1 - ambient) * fragData.vDot;

    return vec4f(fragData.color, 1.0) * lighting;
}`;class w{static async create(e,n,r){const s=e.createShaderModule({code:I});return new w(e,s,n,r)}constructor(e,n,r,s){this.device=e,this.uniformBuffer=e.createBuffer({size:80,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const o=[{attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"float32x3"}],arrayStride:36,stepMode:"vertex"}];this.pipeline=e.createRenderPipeline({label:"Terrain Render Pipeline",layout:"auto",vertex:{module:n,entryPoint:"vertex_main",buffers:o},fragment:{module:n,entryPoint:"fragment_main",targets:[{format:r}]},primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:s}}),this.bindGroup=e.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniformBuffer}}]}),this.vertexBuffer=null,this.indexBuffer=null,this.triangleCount=0}updateMesh(e){if(this.vertexBuffer&&this.vertexBuffer.destroy(),this.indexBuffer&&this.indexBuffer.destroy(),this.triangleCount=e.triangleCount,e.vertexData.byteLength===0){this.vertexBuffer=null,this.indexBuffer=null;return}this.vertexBuffer=this.device.createBuffer({size:e.vertexData.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.indexBuffer=this.device.createBuffer({size:e.triangleIndices.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),this.device.queue.writeBuffer(this.vertexBuffer,0,e.vertexData),this.device.queue.writeBuffer(this.indexBuffer,0,e.triangleIndices)}updateUniforms(e,n){const r=new Float32Array(20);r.set(e,0),r.set(n,16),this.device.queue.writeBuffer(this.uniformBuffer,0,r)}draw(e,n,r){if(n&&r){e.setPipeline(this.pipeline),e.setBindGroup(0,this.bindGroup),e.setVertexBuffer(0,n),e.drawIndirect(r,0);return}!this.vertexBuffer||!this.indexBuffer||this.triangleCount===0||(e.setPipeline(this.pipeline),e.setBindGroup(0,this.bindGroup),e.setVertexBuffer(0,this.vertexBuffer),e.setIndexBuffer(this.indexBuffer,"uint16"),e.drawIndexed(this.triangleCount))}}const A=`struct CursorData {
    cursorPosition : vec3f,
    cursorHit : u32
}

// Layout (96 bytes total):
//   mvp          : mat4x4f  (bytes 0-63)
//   rayOrigin    : vec3f    (bytes 64-75)
//   resolution   : f32      (bytes 76-79)   <-- was _pad0
//   rayDir       : vec3f    (bytes 80-91)
//   sculptEnabled: f32      (bytes 92-95)   <-- was _pad1  (1.0 = sculpt on)
struct Uniforms {
    mvp : mat4x4f,
    rayOrigin : vec3f,
    resolution : f32,
    rayDir : vec3f,
    sculptEnabled : f32
}

@group(0) @binding(0) var<storage, read> grid : array<f32>;
@group(0) @binding(1) var<storage, read_write> cursor : CursorData;
@group(0) @binding(2) var<uniform> uniforms: Uniforms;

// Nearest-neighbour sample of the scalar field at model-space position pos.
fn sampleGrid(pos: vec3f) -> f32 {
    let res = uniforms.resolution;
    let gx = i32(floor((pos.x + 1.0) * 0.5 * res));
    let gy = i32(floor((pos.y + 1.0) * 0.5 * res));
    let gz = i32(floor((pos.z + 1.0) * 0.5 * res));
    let ir = i32(res);
    if (gx < 0 || gx >= ir || gy < 0 || gy >= ir || gz < 0 || gz >= ir) {
        return 0.0;
    }
    let ur = u32(res);
    return grid[u32(gx) + u32(gy) * ur + u32(gz) * ur * ur];
}

@compute @workgroup_size(1)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
    // Reset hit every frame
    cursor.cursorHit = 0u;

    // Only sculpt when Q is held
    if (uniforms.sculptEnabled < 0.5) {
        return;
    }

    let rayOrig = uniforms.rayOrigin;
    let rayDir  = uniforms.rayDir;
    let res     = uniforms.resolution;

    // --- Ray-AABB intersection with the [-1,1]^3 grid box ---
    // Guard against near-zero direction components
    var invDir: vec3f;
    invDir.x = select(1e10, 1.0 / rayDir.x, abs(rayDir.x) > 1e-6);
    invDir.y = select(1e10, 1.0 / rayDir.y, abs(rayDir.y) > 1e-6);
    invDir.z = select(1e10, 1.0 / rayDir.z, abs(rayDir.z) > 1e-6);

    let t0 = (-1.0 - rayOrig) * invDir;
    let t1 = ( 1.0 - rayOrig) * invDir;

    let tmin = max(max(min(t0.x, t1.x), min(t0.y, t1.y)), min(t0.z, t1.z));
    let tmax = min(min(max(t0.x, t1.x), max(t0.y, t1.y)), max(t0.z, t1.z));

    // No intersection or box is entirely behind the ray
    if (tmax < 0.0 || tmin > tmax) {
        return;
    }

    // March from entry point in half-voxel steps
    let stepSize  = (2.0 / res) * 0.5;
    var t         = max(tmin, 0.0);
    var prevDens  = sampleGrid(rayOrig + rayDir * t);

    for (var i: i32 = 0; i < 200; i++) {
        t += stepSize;
        if (t > tmax) { break; }

        let pos  = rayOrig + rayDir * t;
        let dens = sampleGrid(pos);

        // Detect outside-to-inside crossing at the iso-surface (0.5)
        if (prevDens < 0.5 && dens >= 0.5) {
            // Refine to midpoint between the two samples
            cursor.cursorPosition = pos - rayDir * (stepSize * 0.5);
            cursor.cursorHit = 1u;
            return;
        }

        prevDens = dens;
    }
}`,R=`struct CursorData {
    cursorPosition : vec3f,
    cursorHit : u32
}

struct Uniforms {
    brushSize : f32,
    brushStrength : f32,
    resolution : f32
}

@group(0) @binding(0) var<storage, read_write> grid : array<f32>;
@group(0) @binding(1) var<storage, read> cursor : CursorData;
@group(0) @binding(2) var<uniform> uniforms: Uniforms;

@compute @workgroup_size(4, 4, 4)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
    if (cursor.cursorHit == 1u) {
        let dist = distance(cursor.cursorPosition, idx_to_pos(id));
        if (dist < uniforms.brushSize) {
            // Smooth cubic falloff: 1.0 at centre → 0.0 at brushSize edge
            let t       = dist / uniforms.brushSize;          // [0, 1]
            let falloff = 1.0 - smoothstep(0.0, 1.0, t);     // cubic S-curve
            grid[idxVecToFlat(id)] += uniforms.brushStrength * falloff;
        }
    }
}

fn idx_to_pos(idx: vec3<u32>) -> vec3f {
    let r = uniforms.resolution - 1.0;  // matches marchingCubes.wgsl
    let x = 2.0 * (f32(idx.x) / r) - 1.0;
    let y = 2.0 * (f32(idx.y) / r) - 1.0;
    let z = 2.0 * (f32(idx.z) / r) - 1.0;
    return vec3f(x, y, z);
}

fn idxVecToFlat(idx: vec3<u32>) -> u32 {
    let r = u32(uniforms.resolution);
    return idx.x + (idx.y * r) + (idx.z * r * r);
}`;class B{static async create(e,n,r,s){const o=e.createShaderModule({code:A}),i=e.createShaderModule({code:R});return new B(e,o,i,n,r,s)}constructor(e,n,r,s,o,i){this.device=e,this.resolution=i,this.hitUniformBuffer=e.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.updateUniformBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.hitPipeline=e.createComputePipeline({label:"Cursor Hit Pipeline",layout:"auto",compute:{module:n,entryPoint:"main"}}),this.updatePipeline=e.createComputePipeline({label:"Grid Update Pipeline",layout:"auto",compute:{module:r,entryPoint:"main"}}),this.hitBindGroup=e.createBindGroup({layout:this.hitPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:s}},{binding:1,resource:{buffer:o}},{binding:2,resource:{buffer:this.hitUniformBuffer}}]}),this.updateBindGroup=e.createBindGroup({layout:this.updatePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:s}},{binding:1,resource:{buffer:o}},{binding:2,resource:{buffer:this.updateUniformBuffer}}]}),this.brushSize=.5,this.brushStrength=.01,this.setBrush(this.brushSize,this.brushStrength)}setBrush(e,n){this.brushSize=e,this.brushStrength=n;const r=new Float32Array([this.brushSize,this.brushStrength,this.resolution,0]);this.device.queue.writeBuffer(this.updateUniformBuffer,0,r)}updateUniforms(e,n,r,s,o){const i=new Float32Array(24);i.set(e,0),i.set(n,16),i[19]=s,i.set(r,20),i[23]=o?1:0,this.device.queue.writeBuffer(this.hitUniformBuffer,0,i)}compute(e){e.setPipeline(this.hitPipeline),e.setBindGroup(0,this.hitBindGroup),e.dispatchWorkgroups(1);const n=this.resolution/4;e.setPipeline(this.updatePipeline),e.setBindGroup(0,this.updateBindGroup),e.dispatchWorkgroups(n,n,n)}}const Y=`struct Uniforms {
    brushSize : f32,
    brushStrength : f32,
    resolution : f32
}

struct DrawIndirectArgs {
    vertexCount: atomic<u32>,
    instanceCount: u32,
    firstVertex: u32,
    firstInstance: u32,
}

@group(0) @binding(0) var<storage, read> grid : array<f32>;
@group(0) @binding(1) var<storage, read_write> vertexBuffer : array<f32>;
@group(0) @binding(2) var<storage, read_write> indirectArgs: DrawIndirectArgs;
@group(0) @binding(3) var<storage, read> caseTable: array<i32>;
@group(0) @binding(4) var<uniform> uniforms: Uniforms;

// Edge connection table
const edgeCorners = array<vec2<u32>, 12>(
    vec2<u32>(0u, 1u), // Edge 0
    vec2<u32>(1u, 2u), // Edge 1
    vec2<u32>(2u, 3u), // Edge 2
    vec2<u32>(3u, 0u), // Edge 3
    vec2<u32>(4u, 5u), // Edge 4
    vec2<u32>(5u, 6u), // Edge 5
    vec2<u32>(6u, 7u), // Edge 6
    vec2<u32>(7u, 4u), // Edge 7
    vec2<u32>(0u, 4u), // Edge 8
    vec2<u32>(1u, 5u), // Edge 9
    vec2<u32>(2u, 6u), // Edge 10
    vec2<u32>(3u, 7u)  // Edge 11
);

fn getGridValue(idx: vec3<u32>) -> f32 {
    let r = u32(uniforms.resolution);
    if (idx.x >= r || idx.y >= r || idx.z >= r) {
        return 0.0;
    }
    return grid[idx.x + (idx.y * r) + (idx.z * r * r)];
}

fn idx_to_pos(idx: vec3<u32>) -> vec3f {
    let r = uniforms.resolution - 1.0;  // so index 0 → -1.0 and index (res-1) → +1.0
    let x = 2.0 * (f32(idx.x) / r) - 1.0;
    let y = 2.0 * (f32(idx.y) / r) - 1.0;
    let z = 2.0 * (f32(idx.z) / r) - 1.0;
    return vec3f(x, y, z);
}

fn writeVertex(vertexIndex: u32, pos: vec3f, norm: vec3f, col: vec3f) {
    let offset = vertexIndex * 9u;
    vertexBuffer[offset + 0u] = pos.x;
    vertexBuffer[offset + 1u] = pos.y;
    vertexBuffer[offset + 2u] = pos.z;
    vertexBuffer[offset + 3u] = norm.x;
    vertexBuffer[offset + 4u] = norm.y;
    vertexBuffer[offset + 5u] = norm.z;
    vertexBuffer[offset + 6u] = col.x;
    vertexBuffer[offset + 7u] = col.y;
    vertexBuffer[offset + 8u] = col.z;
}

fn getEdgeVertex(edgeIndex: i32, cornerPos: array<vec3f, 8>, cornerVal: array<f32, 8>, iso: f32) -> vec3f {
    let corners = edgeCorners[edgeIndex];
    let idxA = corners.x;
    let idxB = corners.y;
    
    let posA = cornerPos[idxA];
    let posB = cornerPos[idxB];
    let valA = cornerVal[idxA];
    let valB = cornerVal[idxB];
    
    var mu = 0.5;
    let diff = valB - valA;
    if (abs(diff) > 0.00001) {
        mu = (iso - valA) / diff;
    }
    return mix(posA, posB, clamp(mu, 0.0, 1.0));
}

@compute @workgroup_size(4, 4, 4)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
    let res = u32(uniforms.resolution);
    if (id.x >= res - 1u || id.y >= res - 1u || id.z >= res - 1u) {
        return;
    }

    // Standard Paul Bourke corner convention:
    //   Bottom face (y=0): c0→c1→c2→c3 traces around x-z
    //   Top face    (y=1): c4→c5→c6→c7 traces around x-z
    //
    //        c4--------c5
    //       /|        /|
    //      / |       / |
    //    c7--------c6  |
    //     |  c0-----|--c1
    //     | /       | /
    //     |/        |/
    //    c3--------c2
    //
    let c0 = id + vec3<u32>(0u, 0u, 0u);
    let c1 = id + vec3<u32>(1u, 0u, 0u);
    let c2 = id + vec3<u32>(1u, 0u, 1u);
    let c3 = id + vec3<u32>(0u, 0u, 1u);
    let c4 = id + vec3<u32>(0u, 1u, 0u);
    let c5 = id + vec3<u32>(1u, 1u, 0u);
    let c6 = id + vec3<u32>(1u, 1u, 1u);
    let c7 = id + vec3<u32>(0u, 1u, 1u);

    let val0 = getGridValue(c0);
    let val1 = getGridValue(c1);
    let val2 = getGridValue(c2);
    let val3 = getGridValue(c3);
    let val4 = getGridValue(c4);
    let val5 = getGridValue(c5);
    let val6 = getGridValue(c6);
    let val7 = getGridValue(c7);

    var cubeIndex = 0u;
    let iso = 0.5;

    if (val0 >= iso) { cubeIndex |= 1u; }
    if (val1 >= iso) { cubeIndex |= 2u; }
    if (val2 >= iso) { cubeIndex |= 4u; }
    if (val3 >= iso) { cubeIndex |= 8u; }
    if (val4 >= iso) { cubeIndex |= 16u; }
    if (val5 >= iso) { cubeIndex |= 32u; }
    if (val6 >= iso) { cubeIndex |= 64u; }
    if (val7 >= iso) { cubeIndex |= 128u; }

    let tableOffset = cubeIndex * 16u;
    let firstEdge = caseTable[tableOffset + 0u];
    if (firstEdge == -1) {
        return;
    }

    let p0 = idx_to_pos(c0);
    let p1 = idx_to_pos(c1);
    let p2 = idx_to_pos(c2);
    let p3 = idx_to_pos(c3);
    let p4 = idx_to_pos(c4);
    let p5 = idx_to_pos(c5);
    let p6 = idx_to_pos(c6);
    let p7 = idx_to_pos(c7);

    let cornerPos = array<vec3f, 8>(p0, p1, p2, p3, p4, p5, p6, p7);
    let cornerVal = array<f32, 8>(val0, val1, val2, val3, val4, val5, val6, val7);

    for (var i = 0u; i < 15u; i += 3u) {
        let edge0 = caseTable[tableOffset + i];
        if (edge0 == -1) {
            break;
        }
        let edge1 = caseTable[tableOffset + i + 1u];
        let edge2 = caseTable[tableOffset + i + 2u];

        let startVertex = atomicAdd(&indirectArgs.vertexCount, 3u);
        // Prevent buffer overflow (500000 max vertices)
        if (startVertex + 3u > 500000u) {
            break;
        }

        let pos0 = getEdgeVertex(edge0, cornerPos, cornerVal, iso);
        let pos1 = getEdgeVertex(edge1, cornerPos, cornerVal, iso);
        let pos2 = getEdgeVertex(edge2, cornerPos, cornerVal, iso);

        // Standard outward-facing normal with CCW winding (pos0, pos1, pos2)
        let normal = normalize(cross(pos1 - pos0, pos2 - pos0));

        let upFactor = normal.y;
        let grassColor = vec3f(0.3, 0.65, 0.3);
        let dirtColor = vec3f(0.5, 0.4, 0.3);
        let color = mix(dirtColor, grassColor, clamp((upFactor - 0.3) / 0.4, 0.0, 1.0));

        writeVertex(startVertex + 0u, pos0, normal, color);
        writeVertex(startVertex + 1u, pos1, normal, color);
        writeVertex(startVertex + 2u, pos2, normal, color);
    }
}`,V=new Int32Array([-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,3,-1,0,0,0,0,0,0,0,0,0,0,0,0,1,9,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,8,1,9,8,3,1,-1,0,0,0,0,0,0,0,0,0,2,10,1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,8,3,1,2,10,-1,0,0,0,0,0,0,0,0,0,9,2,10,9,0,2,-1,0,0,0,0,0,0,0,0,0,3,2,10,3,10,8,8,10,9,-1,0,0,0,0,0,0,2,3,11,-1,0,0,0,0,0,0,0,0,0,0,0,0,11,0,8,11,2,0,-1,0,0,0,0,0,0,0,0,0,1,9,0,2,3,11,-1,0,0,0,0,0,0,0,0,0,2,1,9,2,9,11,11,9,8,-1,0,0,0,0,0,0,3,10,1,3,11,10,-1,0,0,0,0,0,0,0,0,0,1,0,8,1,8,10,10,8,11,-1,0,0,0,0,0,0,0,3,11,0,11,9,9,11,10,-1,0,0,0,0,0,0,11,10,9,11,9,8,-1,0,0,0,0,0,0,0,0,0,4,7,8,-1,0,0,0,0,0,0,0,0,0,0,0,0,4,3,0,4,7,3,-1,0,0,0,0,0,0,0,0,0,4,7,8,9,0,1,-1,0,0,0,0,0,0,0,0,0,9,4,7,9,7,1,1,7,3,-1,0,0,0,0,0,0,4,7,8,1,2,10,-1,0,0,0,0,0,0,0,0,0,4,3,0,4,7,3,2,10,1,-1,0,0,0,0,0,0,2,9,0,2,10,9,4,7,8,-1,0,0,0,0,0,0,3,2,7,7,9,4,7,2,9,9,2,10,-1,0,0,0,8,4,7,3,11,2,-1,0,0,0,0,0,0,0,0,0,7,11,2,7,2,4,4,2,0,-1,0,0,0,0,0,0,2,3,11,1,9,0,8,4,7,-1,0,0,0,0,0,0,2,1,9,2,9,4,2,4,11,11,4,7,-1,0,0,0,10,3,11,10,1,3,8,4,7,-1,0,0,0,0,0,0,4,7,0,0,10,1,7,10,0,7,11,10,-1,0,0,0,8,4,7,0,3,11,0,11,9,9,11,10,-1,0,0,0,7,9,4,7,11,9,9,11,10,-1,0,0,0,0,0,0,4,9,5,-1,0,0,0,0,0,0,0,0,0,0,0,0,8,3,0,4,9,5,-1,0,0,0,0,0,0,0,0,0,0,5,4,0,1,5,-1,0,0,0,0,0,0,0,0,0,4,8,3,4,3,5,5,3,1,-1,0,0,0,0,0,0,1,2,10,9,5,4,-1,0,0,0,0,0,0,0,0,0,4,9,5,8,3,0,1,2,10,-1,0,0,0,0,0,0,10,5,4,10,4,2,2,4,0,-1,0,0,0,0,0,0,4,8,3,4,3,2,4,2,5,5,2,10,-1,0,0,0,2,3,11,5,4,9,-1,0,0,0,0,0,0,0,0,0,11,0,8,11,2,0,9,5,4,-1,0,0,0,0,0,0,5,0,1,5,4,0,3,11,2,-1,0,0,0,0,0,0,11,2,8,8,5,4,2,5,8,2,1,5,-1,0,0,0,3,10,1,3,11,10,5,4,9,-1,0,0,0,0,0,0,9,5,4,1,0,8,1,8,10,10,8,11,-1,0,0,0,10,5,11,11,0,3,11,5,0,0,5,4,-1,0,0,0,4,10,5,4,8,10,10,8,11,-1,0,0,0,0,0,0,7,9,5,7,8,9,-1,0,0,0,0,0,0,0,0,0,0,9,5,0,5,3,3,5,7,-1,0,0,0,0,0,0,8,0,1,8,1,7,7,1,5,-1,0,0,0,0,0,0,3,1,5,3,5,7,-1,0,0,0,0,0,0,0,0,0,7,9,5,7,8,9,1,2,10,-1,0,0,0,0,0,0,1,2,10,0,9,5,0,5,3,3,5,7,-1,0,0,0,7,8,5,5,2,10,8,2,5,8,0,2,-1,0,0,0,10,3,2,10,5,3,3,5,7,-1,0,0,0,0,0,0,9,7,8,9,5,7,11,2,3,-1,0,0,0,0,0,0,0,9,2,2,7,11,2,9,7,7,9,5,-1,0,0,0,3,11,2,8,0,1,8,1,7,7,1,5,-1,0,0,0,2,7,11,2,1,7,7,1,5,-1,0,0,0,0,0,0,11,1,3,11,10,1,7,8,9,7,9,5,-1,0,0,0,11,10,1,11,1,7,7,1,0,7,0,9,7,9,5,-1,5,7,8,5,8,10,10,8,0,10,0,3,10,3,11,-1,11,10,5,11,5,7,-1,0,0,0,0,0,0,0,0,0,10,6,5,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,8,3,10,6,5,-1,0,0,0,0,0,0,0,0,0,9,0,1,5,10,6,-1,0,0,0,0,0,0,0,0,0,8,1,9,8,3,1,10,6,5,-1,0,0,0,0,0,0,6,1,2,6,5,1,-1,0,0,0,0,0,0,0,0,0,6,1,2,6,5,1,0,8,3,-1,0,0,0,0,0,0,5,9,0,5,0,6,6,0,2,-1,0,0,0,0,0,0,6,5,2,2,8,3,5,8,2,5,9,8,-1,0,0,0,2,3,11,10,6,5,-1,0,0,0,0,0,0,0,0,0,0,11,2,0,8,11,6,5,10,-1,0,0,0,0,0,0,0,1,9,3,11,2,10,6,5,-1,0,0,0,0,0,0,10,6,5,2,1,9,2,9,11,11,9,8,-1,0,0,0,11,6,5,11,5,3,3,5,1,-1,0,0,0,0,0,0,11,6,8,8,1,0,8,6,1,1,6,5,-1,0,0,0,0,3,11,0,11,6,0,6,9,9,6,5,-1,0,0,0,5,11,6,5,9,11,11,9,8,-1,0,0,0,0,0,0,7,8,4,6,5,10,-1,0,0,0,0,0,0,0,0,0,3,4,7,3,0,4,5,10,6,-1,0,0,0,0,0,0,6,5,10,7,8,4,9,0,1,-1,0,0,0,0,0,0,5,10,6,9,4,7,9,7,1,1,7,3,-1,0,0,0,1,6,5,1,2,6,7,8,4,-1,0,0,0,0,0,0,7,0,4,7,3,0,6,5,1,6,1,2,-1,0,0,0,4,7,8,5,9,0,5,0,6,6,0,2,-1,0,0,0,2,6,5,2,5,3,3,5,9,3,9,4,3,4,7,-1,4,7,8,5,10,6,11,2,3,-1,0,0,0,0,0,0,6,5,10,7,11,2,7,2,4,4,2,0,-1,0,0,0,4,7,8,9,0,1,6,5,10,3,11,2,-1,0,0,0,6,5,10,11,4,7,11,2,4,4,2,9,9,2,1,-1,7,8,4,11,6,5,11,5,3,3,5,1,-1,0,0,0,0,4,7,0,7,1,1,7,11,1,11,6,1,6,5,-1,4,7,8,9,6,5,9,0,6,6,0,11,11,0,3,-1,7,11,4,11,9,4,11,5,9,11,6,5,-1,0,0,0,10,4,9,10,6,4,-1,0,0,0,0,0,0,0,0,0,10,4,9,10,6,4,8,3,0,-1,0,0,0,0,0,0,1,10,6,1,6,0,0,6,4,-1,0,0,0,0,0,0,4,8,6,6,1,10,6,8,1,1,8,3,-1,0,0,0,9,1,2,9,2,4,4,2,6,-1,0,0,0,0,0,0,0,8,3,9,1,2,9,2,4,4,2,6,-1,0,0,0,0,2,6,0,6,4,-1,0,0,0,0,0,0,0,0,0,3,4,8,3,2,4,4,2,6,-1,0,0,0,0,0,0,4,10,6,4,9,10,2,3,11,-1,0,0,0,0,0,0,8,2,0,8,11,2,4,9,10,4,10,6,-1,0,0,0,2,3,11,1,10,6,1,6,0,0,6,4,-1,0,0,0,8,11,2,8,2,4,4,2,1,4,1,10,4,10,6,-1,3,11,1,1,4,9,11,4,1,11,6,4,-1,0,0,0,6,4,9,6,9,11,11,9,1,11,1,0,11,0,8,-1,11,0,3,11,6,0,0,6,4,-1,0,0,0,0,0,0,8,11,6,8,6,4,-1,0,0,0,0,0,0,0,0,0,6,7,8,6,8,10,10,8,9,-1,0,0,0,0,0,0,3,0,7,7,10,6,0,10,7,0,9,10,-1,0,0,0,1,10,6,1,6,7,1,7,0,0,7,8,-1,0,0,0,6,1,10,6,7,1,1,7,3,-1,0,0,0,0,0,0,9,1,8,8,6,7,8,1,6,6,1,2,-1,0,0,0,7,3,0,7,0,6,6,0,9,6,9,1,6,1,2,-1,8,6,7,8,0,6,6,0,2,-1,0,0,0,0,0,0,2,6,7,2,7,3,-1,0,0,0,0,0,0,0,0,0,11,2,3,6,7,8,6,8,10,10,8,9,-1,0,0,0,9,10,6,9,6,0,0,6,7,0,7,11,0,11,2,-1,3,11,2,0,7,8,0,1,7,7,1,6,6,1,10,-1,6,7,10,7,1,10,7,2,1,7,11,2,-1,0,0,0,1,3,11,1,11,9,9,11,6,9,6,7,9,7,8,-1,6,7,11,9,1,0,-1,0,0,0,0,0,0,0,0,0,8,0,7,0,6,7,0,11,6,0,3,11,-1,0,0,0,6,7,11,-1,0,0,0,0,0,0,0,0,0,0,0,0,6,11,7,-1,0,0,0,0,0,0,0,0,0,0,0,0,3,0,8,11,7,6,-1,0,0,0,0,0,0,0,0,0,6,11,7,9,0,1,-1,0,0,0,0,0,0,0,0,0,1,8,3,1,9,8,7,6,11,-1,0,0,0,0,0,0,11,7,6,2,10,1,-1,0,0,0,0,0,0,0,0,0,1,2,10,0,8,3,11,7,6,-1,0,0,0,0,0,0,9,2,10,9,0,2,11,7,6,-1,0,0,0,0,0,0,11,7,6,3,2,10,3,10,8,8,10,9,-1,0,0,0,2,7,6,2,3,7,-1,0,0,0,0,0,0,0,0,0,8,7,6,8,6,0,0,6,2,-1,0,0,0,0,0,0,7,2,3,7,6,2,1,9,0,-1,0,0,0,0,0,0,8,7,9,9,2,1,9,7,2,2,7,6,-1,0,0,0,6,10,1,6,1,7,7,1,3,-1,0,0,0,0,0,0,6,10,1,6,1,0,6,0,7,7,0,8,-1,0,0,0,7,6,3,3,9,0,6,9,3,6,10,9,-1,0,0,0,6,8,7,6,10,8,8,10,9,-1,0,0,0,0,0,0,8,6,11,8,4,6,-1,0,0,0,0,0,0,0,0,0,11,3,0,11,0,6,6,0,4,-1,0,0,0,0,0,0,6,8,4,6,11,8,0,1,9,-1,0,0,0,0,0,0,1,9,3,3,6,11,9,6,3,9,4,6,-1,0,0,0,8,6,11,8,4,6,10,1,2,-1,0,0,0,0,0,0,2,10,1,11,3,0,11,0,6,6,0,4,-1,0,0,0,11,4,6,11,8,4,2,10,9,2,9,0,-1,0,0,0,4,6,11,4,11,9,9,11,3,9,3,2,9,2,10,-1,3,8,4,3,4,2,2,4,6,-1,0,0,0,0,0,0,2,0,4,2,4,6,-1,0,0,0,0,0,0,0,0,0,0,1,9,3,8,4,3,4,2,2,4,6,-1,0,0,0,9,2,1,9,4,2,2,4,6,-1,0,0,0,0,0,0,6,10,4,4,3,8,4,10,3,3,10,1,-1,0,0,0,1,6,10,1,0,6,6,0,4,-1,0,0,0,0,0,0,10,9,0,10,0,6,6,0,3,6,3,8,6,8,4,-1,10,9,4,10,4,6,-1,0,0,0,0,0,0,0,0,0,6,11,7,5,4,9,-1,0,0,0,0,0,0,0,0,0,0,8,3,9,5,4,7,6,11,-1,0,0,0,0,0,0,0,5,4,0,1,5,6,11,7,-1,0,0,0,0,0,0,7,6,11,4,8,3,4,3,5,5,3,1,-1,0,0,0,2,10,1,11,7,6,5,4,9,-1,0,0,0,0,0,0,0,8,3,1,2,10,4,9,5,11,7,6,-1,0,0,0,6,11,7,10,5,4,10,4,2,2,4,0,-1,0,0,0,6,11,7,5,2,10,5,4,2,2,4,3,3,4,8,-1,2,7,6,2,3,7,4,9,5,-1,0,0,0,0,0,0,4,9,5,8,7,6,8,6,0,0,6,2,-1,0,0,0,3,6,2,3,7,6,0,1,5,0,5,4,-1,0,0,0,1,5,4,1,4,2,2,4,8,2,8,7,2,7,6,-1,5,4,9,6,10,1,6,1,7,7,1,3,-1,0,0,0,4,9,5,7,0,8,7,6,0,0,6,1,1,6,10,-1,3,7,6,3,6,0,0,6,10,0,10,5,0,5,4,-1,4,8,5,8,10,5,8,6,10,8,7,6,-1,0,0,0,5,6,11,5,11,9,9,11,8,-1,0,0,0,0,0,0,0,9,5,0,5,6,0,6,3,3,6,11,-1,0,0,0,8,0,11,11,5,6,11,0,5,5,0,1,-1,0,0,0,11,5,6,11,3,5,5,3,1,-1,0,0,0,0,0,0,10,1,2,5,6,11,5,11,9,9,11,8,-1,0,0,0,2,10,1,3,6,11,3,0,6,6,0,5,5,0,9,-1,0,2,10,0,10,8,8,10,5,8,5,6,8,6,11,-1,11,3,6,3,5,6,3,10,5,3,2,10,-1,0,0,0,2,3,6,6,9,5,3,9,6,3,8,9,-1,0,0,0,5,0,9,5,6,0,0,6,2,-1,0,0,0,0,0,0,6,2,3,6,3,5,5,3,8,5,8,0,5,0,1,-1,6,2,1,6,1,5,-1,0,0,0,0,0,0,0,0,0,8,9,5,8,5,3,3,5,6,3,6,10,3,10,1,-1,1,0,10,0,6,10,0,5,6,0,9,5,-1,0,0,0,0,3,8,10,5,6,-1,0,0,0,0,0,0,0,0,0,10,5,6,-1,0,0,0,0,0,0,0,0,0,0,0,0,11,5,10,11,7,5,-1,0,0,0,0,0,0,0,0,0,5,11,7,5,10,11,3,0,8,-1,0,0,0,0,0,0,11,5,10,11,7,5,9,0,1,-1,0,0,0,0,0,0,9,3,1,9,8,3,5,10,11,5,11,7,-1,0,0,0,2,11,7,2,7,1,1,7,5,-1,0,0,0,0,0,0,3,0,8,2,11,7,2,7,1,1,7,5,-1,0,0,0,2,11,0,0,5,9,0,11,5,5,11,7,-1,0,0,0,9,8,3,9,3,5,5,3,2,5,2,11,5,11,7,-1,10,2,3,10,3,5,5,3,7,-1,0,0,0,0,0,0,5,10,7,7,0,8,10,0,7,10,2,0,-1,0,0,0,1,9,0,10,2,3,10,3,5,5,3,7,-1,0,0,0,7,5,10,7,10,8,8,10,2,8,2,1,8,1,9,-1,7,5,1,7,1,3,-1,0,0,0,0,0,0,0,0,0,8,1,0,8,7,1,1,7,5,-1,0,0,0,0,0,0,0,5,9,0,3,5,5,3,7,-1,0,0,0,0,0,0,7,5,9,7,9,8,-1,0,0,0,0,0,0,0,0,0,4,5,10,4,10,8,8,10,11,-1,0,0,0,0,0,0,11,3,10,10,4,5,10,3,4,4,3,0,-1,0,0,0,9,0,1,4,5,10,4,10,8,8,10,11,-1,0,0,0,3,1,9,3,9,11,11,9,4,11,4,5,11,5,10,-1,8,4,11,11,1,2,4,1,11,4,5,1,-1,0,0,0,5,1,2,5,2,4,4,2,11,4,11,3,4,3,0,-1,11,8,4,11,4,2,2,4,5,2,5,9,2,9,0,-1,2,11,3,5,9,4,-1,0,0,0,0,0,0,0,0,0,4,5,10,4,10,2,4,2,8,8,2,3,-1,0,0,0,10,4,5,10,2,4,4,2,0,-1,0,0,0,0,0,0,0,1,9,8,2,3,8,4,2,2,4,10,10,4,5,-1,10,2,5,2,4,5,2,9,4,2,1,9,-1,0,0,0,4,3,8,4,5,3,3,5,1,-1,0,0,0,0,0,0,0,4,5,0,5,1,-1,0,0,0,0,0,0,0,0,0,0,3,9,3,5,9,3,4,5,3,8,4,-1,0,0,0,4,5,9,-1,0,0,0,0,0,0,0,0,0,0,0,0,7,4,9,7,9,11,11,9,10,-1,0,0,0,0,0,0,8,3,0,7,4,9,7,9,11,11,9,10,-1,0,0,0,0,1,4,4,11,7,1,11,4,1,10,11,-1,0,0,0,10,11,7,10,7,1,1,7,4,1,4,8,1,8,3,-1,2,11,7,2,7,4,2,4,1,1,4,9,-1,0,0,0,0,8,3,1,4,9,1,2,4,4,2,7,7,2,11,-1,7,2,11,7,4,2,2,4,0,-1,0,0,0,0,0,0,7,4,11,4,2,11,4,3,2,4,8,3,-1,0,0,0,7,4,3,3,10,2,3,4,10,10,4,9,-1,0,0,0,2,0,8,2,8,10,10,8,7,10,7,4,10,4,9,-1,4,0,1,4,1,7,7,1,10,7,10,2,7,2,3,-1,4,8,7,1,10,2,-1,0,0,0,0,0,0,0,0,0,9,7,4,9,1,7,7,1,3,-1,0,0,0,0,0,0,8,7,0,7,1,0,7,9,1,7,4,9,-1,0,0,0,4,0,3,4,3,7,-1,0,0,0,0,0,0,0,0,0,4,8,7,-1,0,0,0,0,0,0,0,0,0,0,0,0,8,9,10,8,10,11,-1,0,0,0,0,0,0,0,0,0,0,11,3,0,9,11,11,9,10,-1,0,0,0,0,0,0,1,8,0,1,10,8,8,10,11,-1,0,0,0,0,0,0,3,1,10,3,10,11,-1,0,0,0,0,0,0,0,0,0,2,9,1,2,11,9,9,11,8,-1,0,0,0,0,0,0,0,9,3,9,11,3,9,2,11,9,1,2,-1,0,0,0,11,8,0,11,0,2,-1,0,0,0,0,0,0,0,0,0,2,11,3,-1,0,0,0,0,0,0,0,0,0,0,0,0,3,10,2,3,8,10,10,8,9,-1,0,0,0,0,0,0,9,10,2,9,2,0,-1,0,0,0,0,0,0,0,0,0,3,8,2,8,10,2,8,1,10,8,0,1,-1,0,0,0,2,1,10,-1,0,0,0,0,0,0,0,0,0,0,0,0,8,9,1,8,1,3,-1,0,0,0,0,0,0,0,0,0,1,0,9,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,8,-1,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);class b{static async create(e,n,r,s){const o=e.createShaderModule({code:Y});return new b(e,o,n,r,s)}constructor(e,n,r,s,o){this.device=e,this.resolution=o,this.vertexBuffer=e.createBuffer({size:5e5*36,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.VERTEX}),this.indirectBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.INDIRECT|GPUBufferUsage.COPY_DST}),this.caseTableBuffer=e.createBuffer({size:V.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),e.queue.writeBuffer(this.caseTableBuffer,0,V),this.pipeline=e.createComputePipeline({label:"Marching Cubes Compute Pipeline",layout:"auto",compute:{module:n,entryPoint:"main"}}),this.bindGroup=e.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:r}},{binding:1,resource:{buffer:this.vertexBuffer}},{binding:2,resource:{buffer:this.indirectBuffer}},{binding:3,resource:{buffer:this.caseTableBuffer}},{binding:4,resource:{buffer:s}}]})}compute(e){const n=this.resolution/4;e.setPipeline(this.pipeline),e.setBindGroup(0,this.bindGroup),e.dispatchWorkgroups(n,n,n)}}window.inputState={deltaX:0,deltaY:0,velocityX:0,velocityY:0,zoom:7,interacting:!1,mouseX:0,mouseY:0,ndcX:0,ndcY:0,sculptMode:!1};document.addEventListener("keydown",function(t){t.code==="KeyQ"&&!t.repeat&&(window.inputState.sculptMode=!0)});document.addEventListener("keyup",function(t){t.code==="KeyQ"&&(window.inputState.sculptMode=!1)});(function(){const t=document.getElementById("canvas");if(!t){console.error("Canvas element not found!");return}const e=new Hammer.Manager(t);e.add(new Hammer.Pan({direction:Hammer.DIRECTION_ALL,threshold:1})),e.add(new Hammer.Pinch({enable:!0})),e.get("pinch").recognizeWith("pan");let n=0,r=0;e.on("panstart",function(){n=0,r=0,window.inputState.interacting=!0}),e.on("panmove",function(o){const i=o.deltaX-n,a=o.deltaY-r;n=o.deltaX,r=o.deltaY;const c=.007;window.inputState.deltaX+=i*c,window.inputState.deltaY+=a*c,window.inputState.velocityX=i*c,window.inputState.velocityY=a*c}),e.on("panend pancancel",function(){window.inputState.interacting=!1});let s=7;e.on("pinchstart",function(){s=window.inputState.zoom,window.inputState.interacting=!0}),e.on("pinchmove",function(o){const i=Math.pow(o.scale,20);window.inputState.zoom=Math.min(20,Math.max(2,s/i))}),e.on("pinchend pinchcancel",function(){window.inputState.interacting=!1}),t.addEventListener("pointermove",function(o){const i=t.getBoundingClientRect(),a=o.clientX-i.left,c=o.clientY-i.top;window.inputState.mouseX=a,window.inputState.mouseY=c,window.inputState.ndcX=a/i.width*2-1,window.inputState.ndcY=1-c/i.height*2}),t.addEventListener("wheel",function(o){o.preventDefault(),window.inputState.zoom=Math.min(20,Math.max(2,window.inputState.zoom+o.deltaY*.01))},{passive:!1})})();const p=32,X=p*p*p;function L(t=p){const e=new Float32Array(t*t*t);for(let n=0;n<t;n++)for(let r=0;r<t;r++)e[r+1*t+n*t*t]=1;return e}class F{constructor(e){if(this.canvas=document.getElementById(e),!this.canvas)throw new Error(`Canvas with ID "${e}" not found.`);this.device=null,this.context=null,this.colorFormat=null,this.depthFormat="depth24plus",this.depthTexture=null,this.terrainRenderer=null,this.proj=h(),this.view=h(),this.mv=h(),this.mvp=h(),this.norm=h(),this.modelRotation=h(),this.tempMatrix=h(),_(this.modelRotation,this.modelRotation,.35),this.lightDirWorld=[0,.7,1]}async createStorageBuffers(){const e=X*4;this.gridBuffer=this.device.createBuffer({size:e,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});const n=16;this.cursorBuffer=this.device.createBuffer({size:n,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}async init(){if(!navigator.gpu)throw new Error("WebGPU not supported in this browser!");const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("No appropriate GPUAdapter found!");this.device=await e.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.colorFormat=navigator.gpu.getPreferredCanvasFormat(),this.resizeCanvas(),this.context.configure({device:this.device,format:this.colorFormat,alphaMode:"premultiplied"}),await this.createStorageBuffers(),this.device.queue.writeBuffer(this.gridBuffer,0,L()),this.terrainRenderer=await w.create(this.device,this.colorFormat,this.depthFormat),this.gridUpdater=await B.create(this.device,this.gridBuffer,this.cursorBuffer,p),this.vertexStreamer=await b.create(this.device,this.gridBuffer,this.gridUpdater.updateUniformBuffer,p),this.start()}resizeCanvas(){const e=window.devicePixelRatio||1,n=this.canvas.clientWidth*e|0,r=this.canvas.clientHeight*e|0;if(this.canvas.width!==n||this.canvas.height!==r){this.canvas.width=n,this.canvas.height=r,this.depthTexture&&this.depthTexture.destroy(),this.depthTexture=this.device.createTexture({size:[n,r],format:this.depthFormat,usage:GPUTextureUsage.RENDER_ATTACHMENT});const s=n/r;O(this.proj,Math.PI/6,s,.1,100)}}getMouseRay(e,n){const r=this.proj,s=e/r[0],o=n/r[5],i=this.view,a=i[0]*s+i[1]*o+i[2]*-1,c=i[4]*s+i[5]*o+i[6]*-1,d=i[8]*s+i[9]*o+i[10]*-1,l=-(i[0]*i[12]+i[1]*i[13]+i[2]*i[14]),m=-(i[4]*i[12]+i[5]*i[13]+i[6]*i[14]),f=-(i[8]*i[12]+i[9]*i[13]+i[10]*i[14]),u=this.modelRotation,S=u[0]*l+u[1]*m+u[2]*f,P=u[4]*l+u[5]*m+u[6]*f,z=u[8]*l+u[9]*m+u[10]*f,U=u[0]*a+u[1]*c+u[2]*d,G=u[4]*a+u[5]*c+u[6]*d,C=u[8]*a+u[9]*c+u[10]*d,v=Math.hypot(U,G,C);return v<1e-6?{origin:[S,P,z],dir:[0,0,-1]}:{origin:[S,P,z],dir:[U/v,G/v,C/v]}}update(){const e=window.inputState||{deltaX:0,deltaY:0,velocityX:0,velocityY:0,zoom:7,interacting:!1,ndcX:0,ndcY:0};let n=0,r=0;if(e.interacting?(n=e.deltaX,r=e.deltaY,e.deltaX=0,e.deltaY=0):(n=e.velocityX,r=e.velocityY,e.velocityX*=.95,e.velocityY*=.95,Math.abs(e.velocityX)<1e-4&&(e.velocityX=0),Math.abs(e.velocityY)<1e-4&&(e.velocityY=0)),n!==0||r!==0){const a=h();E(a,a,n),_(a,a,r),g(this.tempMatrix,a,this.modelRotation),this.modelRotation.set(this.tempMatrix)}const s=[0,0,e.zoom];T(this.view,s,[0,0,0],[0,1,0]);const o=this.getMouseRay(e.ndcX,e.ndcY);g(this.mv,this.view,this.modelRotation),g(this.mvp,this.proj,this.mv),M(this.norm,this.mv);const i=window.inputState&&window.inputState.sculptMode||!1;this.terrainRenderer.updateUniforms(this.mvp,this.lightDirWorld),this.gridUpdater.updateUniforms(this.mvp,o.origin,o.dir,p,i)}render(){this.resizeCanvas(),this.device.queue.writeBuffer(this.vertexStreamer.indirectBuffer,0,new Uint32Array([0,1,0,0]));const e=this.device.createCommandEncoder(),n={colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:{r:.03,g:.03,b:.05,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this.depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}},r=e.beginComputePass();this.gridUpdater.compute(r),this.vertexStreamer.compute(r),r.end();const s=e.beginRenderPass(n);this.terrainRenderer.draw(s,this.vertexStreamer.vertexBuffer,this.vertexStreamer.indirectBuffer),s.end(),this.device.queue.submit([e.finish()])}start(){const e=()=>{this.update(),this.render(),requestAnimationFrame(e)};requestAnimationFrame(e)}}window.addEventListener("DOMContentLoaded",()=>{new F("canvas").init().catch(e=>{console.error("Failed to initialize WebGPU Engine:",e)})});
