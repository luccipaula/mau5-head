function init() {
    var scene = new THREE.Scene();

    // initialize objects
    var head = getSphere(10.2, 32, 32, 0xe94048);
    var ear1 = getCylinder(10.5, 10.5, .5, 32);
    var ear2 = getCylinder(10.5, 10.5, .5, 32);
    var eye1 = getSphere(3, 32, 32, 0xffffff);
    var eye2 = getSphere(3, 32, 32, 0xffffff);
    var mouth = getSphereBuffer(9.5, 32, 32, 0, 1.2, 0xffffff);

    // positioning
    head.position.set(0, 0, 0);
    ear1.position.set(-13, 12, 0);
    ear2.position.set(13, 12, 0);
    eye1.position.set(-5.5, 4, -7);
    eye2.position.set(5.5, 4, -7);
    mouth.position.set(0, 0, -2);

    ear1.rotation.x = Math.PI / 2;
    ear2.rotation.x = Math.PI / 2;
    mouth.rotation.x = Math.PI / 2;
    mouth.rotation.z = Math.PI / 2;

    // lights
    var ambientLight = new THREE.AmbientLight(0xffffff, .5);
    var pointLight = new THREE.PointLight(0xffffff, 1);

    pointLight.position.x = -100;
    pointLight.position.y = 50;
    pointLight.position.z = 50;


    // add objects to scene
    scene.add(head);
    scene.add(ear1);
    scene.add(ear2);
    scene.add(eye1);
    scene.add(eye2);
    scene.add(mouth);
    scene.add(ambientLight);
    scene.add(pointLight);

    // camera
    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(5, 0, -150);

    // render process
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('webgl')
    });
    renderer.setClearColor(0x333333);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    
    renderer.render(
        scene,
        camera
    );

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);

    return scene;
}

// functions

function getSphere(radius, width, height, color) {
    var geometry = new THREE.SphereGeometry(radius, width, height);
    var material = new THREE.MeshLambertMaterial({
        color: color
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

function getSphereBuffer(radius, width, height, phiStart, phiLength, color) {
    var geometry = new THREE.SphereBufferGeometry(radius, width, height, phiStart, phiLength);
    var material = new THREE.MeshLambertMaterial({
        color: color
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

function getCylinder(radius1, radius2, height, segments) {
    var geometry = new THREE.CylinderGeometry(radius1, radius2, height, segments);
    var material = new THREE.MeshLambertMaterial({
        color: 0xe94048
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

function update(renderer, scene, camera, controls) {
    renderer.render(
        scene,
        camera
    );

    controls.update();

    requestAnimationFrame(function() {
        update(renderer, scene, camera, controls);
    });
}

// initialization

var scene = init();