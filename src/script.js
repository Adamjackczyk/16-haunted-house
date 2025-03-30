import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {Sky} from 'three/examples/jsm/objects/Sky.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Textures
const textureLoader = new THREE.TextureLoader()

//Floor

const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')

floorColorTexture.colorSpace = THREE.SRGBColorSpace


floorColorTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping

//Walls

const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')
const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

//Roof

const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofNormalTexture.repeat.set(3,1)
roofColorTexture.repeat.set(3,1)
roofARMTexture.repeat.set(3,1)

roofNormalTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping

//Bush

const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushNormalTexture.repeat.set(2,1)
bushColorTexture.repeat.set(2,1)
bushARMTexture.repeat.set(2,1)

bushNormalTexture.wrapS = THREE.RepeatWrapping
bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping

//Grave

const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveNormalTexture.repeat.set(.3,.4)
graveColorTexture.repeat.set(.3,.4)
graveARMTexture.repeat.set(.3,.4)

graveNormalTexture.wrapS = THREE.RepeatWrapping
graveColorTexture.wrapS = THREE.RepeatWrapping
graveARMTexture.wrapS = THREE.RepeatWrapping

//Door

const doorColorTexture = textureLoader.load('./door/color.webp')
const doorNormalTexture = textureLoader.load('./door/normal.webp')
const doorAOTexture = textureLoader.load('./door/ambientOcclusion.webp')
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp')
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp')
const doorAlphaTexture = textureLoader.load('./door/alpha.webp')
const doorHeightTexture = textureLoader.load('./door/height.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace


/** 
 * House
 */


//Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: floorColorTexture, 
        alphaMap: floorAlphaTexture, 
        normalMap: floorNormalTexture, 
        displacementMap: floorDisplacementTexture, 
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        transparent: true, 
        displacementScale: .3,
        displacementBias: -0.2
    })
)

floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

// gui.add(floor.material, 'displacementScale', 0, 1, 0.001).name('Floor Displacement Scale')
// gui.add(floor.material, 'displacementBias', -1, 1, 0.001).name('Floor Displacement Bias')


//House contaner

const house = new THREE.Group()
scene.add(house)

//Wall
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial(
        {
            map: wallColorTexture,
            normalMap: wallNormalTexture,
            aoMap: wallARMTexture,
            roughnessMap: wallARMTexture,
            metalnessMap: wallARMTexture
        }
    )
)
walls.position.y = 2.5 / 2

house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({ 
        map: roofColorTexture,
        normalMap: roofNormalTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture
    })
)
roof.position.y =2.5 + .75
roof.rotation.y = - Math.PI * 0.25

house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial(
        {
            map: doorColorTexture,
            normalMap: doorNormalTexture,
            aoMap: doorAOTexture,
            transparent: true,
            roughnessMap: doorRoughnessTexture,
            metalnessMap: doorMetalnessTexture,
            alphaMap: doorAlphaTexture,
            displacementMap: doorHeightTexture,
            displacementScale: .15,
            displacementBias: -0.04,
            
        }
    )
)
door.position.y = 1
door.position.z = 2.0001

house.add(door)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial(
    {
        color: '#99c8a0',
        map: bushColorTexture,
        normalMap: bushNormalTexture,
        aoMap: bushARMTexture,
        roughnessMap: bushARMTexture,
        metalnessMap: bushARMTexture
    }
)
// gui.addColor(bushMaterial, 'color').name('Bush Color').onChange(() => {
//     console.log('Hex string:', '#' + bushMaterial.color.getHexString());
// });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(.5, .5, .5)
bush1.position.set(.8, .2, 2.2)
bush1.rotation.x = -.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(.25, .25, .25)
bush2.position.set(1.4, .1, 2.1)
bush2.rotation.x = -.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(.5, .5, .5)
bush3.position.set(-.8, .1, 2.2)
bush3.rotation.x = -.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(.15, .15, .15)
bush4.position.set(-1.1, .05, 2.6)
bush4.rotation.x = -.75

house.add(bush1, bush2, bush3, bush4)

//Graves

const graveGeometry = new THREE.BoxGeometry(.6, .8, .2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    normalMap: graveNormalTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture
})

const graves = new THREE.Group()

for (let i = 0; i < 30; i++)
{
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + (Math.random() * 4)
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    
    //Mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    //Position
    grave.position.x = x
    grave.position.y = Math.random() * .4
    grave.position.z = z

    //Rotation
    grave.rotation.x = (Math.random() - .5) * .4
    grave.rotation.y = (Math.random() - .5) * .4
    grave.rotation.z = (Math.random() - .5) * .4

    //Add to graves group 
    graves.add(grave)
}

scene.add(graves)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

//Door light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
scene.add(doorLight)

//Ghost
const ghost1 = new THREE.PointLight('#7af0e4', 6)
ghost1.position.set(0, 2.2, 2.5)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#7af0e4', 6)
ghost2.position.set(0, 2.2, 2.5)
ghost2.position.x = -1
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#7af0e4', 6)
ghost3.position.set(0, 2.2, 2.5)
ghost3.position.x = 1
scene.add(ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    
    // Add fullscreen toggle with double-click
    window.addEventListener('dblclick', () =>
    {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    
        if(!fullscreenElement)
        {
            if(canvas.requestFullscreen)
            {
                canvas.requestFullscreen()
            }
            else if(canvas.webkitRequestFullscreen)
            {
                canvas.webkitRequestFullscreen()
            }
        }
        else
        {
            if(document.exitFullscreen)
            {
                document.exitFullscreen()
            }
            else if(document.webkitExitFullscreen)
            {
                document.webkitExitFullscreen()
            }
        }
    })

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI / 2.03
controls.minDistance = 4.5

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Cast and receive shadows
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
directionalLight.castShadow = true
doorLight.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true
for(const grave of graves.children)
{
    grave.castShadow = true
    grave.receiveShadow = true
}

//Mapping
directionalLight.shadow.mapSize.set(256, 256)
directionalLight.shadow.camera.far = 20
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.bottom = -8

ghost1.shadow.mapSize.set(256, 256)
ghost2.shadow.mapSize.set(256, 256)
ghost3.shadow.mapSize.set(256, 256)

ghost1.shadow.camera.far = 10
ghost2.shadow.camera.far = 10
ghost3.shadow.camera.far = 10

//Sky
const sky = new Sky()
sky.scale.set(100, 100, 100)
sky.material.uniforms.turbidity.value = 10
sky.material.uniforms.rayleigh.value = 3
sky.material.uniforms.mieCoefficient.value = 0.1
sky.material.uniforms.mieDirectionalG.value = 0.95
sky.material.uniforms.sunPosition.value.set(.3, -.038, -.95)
scene.add(sky)

//Fog
// scene.fog = new THREE.Fog('#262837', 1, 13)
scene.fog = new THREE.FogExp2('#02343f', 0.1)

/**
 * Animate
 */
const timer = new Timer()

const ghost1StartOffset = Math.random() * Math.PI * 4
const ghost2StartOffset = Math.random() * Math.PI * 4
const ghost3StartOffset = Math.random() * Math.PI * 4

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    //Ghost

    const ghost1Angle = elapsedTime * .5 + ghost1StartOffset
    const ghost2Angle = elapsedTime * .38 + ghost2StartOffset
    const ghost3Angle = elapsedTime * .23 + ghost3StartOffset

    // Update ghost
    ghost1.position.x = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 3.2) * Math.sin(ghost1Angle * 2.43)  
    ghost1.position.z = Math.cos(ghost1Angle) * 4

    ghost2.position.x = Math.sin(ghost2Angle) * 5
    ghost2.position.z = Math.cos(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 1.35) * Math.sin(ghost2Angle * 5.43)  

    ghost3.position.x = Math.sin(ghost3Angle) * 6
    ghost3.position.z = Math.cos(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 4.21) * Math.sin(ghost3Angle * 1.25)  

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()