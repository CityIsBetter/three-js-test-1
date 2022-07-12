let scene, camera, renderer;

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', onDocumentMouseMove);


function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera.position.z = 30;

    const ambientLight = new THREE.AmbientLight(0xffffff);

    scene.add( ambientLight );

    starGeo = new THREE.Geometry();
    for (let i=0; i<=6000; i++){
        star = new THREE.Vector3(
            Math.random() * 600 -300,
            Math.random() * 600 -300,
            Math.random() * 600 -300
        );
        starGeo.vertices.push(star);
    }
    let sprite = new THREE.TextureLoader().load('star.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);
}



function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - (window.innerWidth/2) ) / 100;
    mouseY = ( event.clientY - (window.innerHeight/2) ) / 100;

}



function animate() {
	requestAnimationFrame( animate );
    camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
	renderer.render( scene, camera );
}



function onWindowResize(){
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
