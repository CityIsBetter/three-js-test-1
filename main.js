

let scene, camera, renderer, star;

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

    scene.add( ambientLight )


    function addStar(){
        const geometry = new THREE.SphereGeometry( 0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
        star = new THREE.Mesh( geometry, material );
    
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
        
        star.position.set(x, y, z);
        scene.add(star);
    }
    
    Array(300).fill().forEach(addStar);
    
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

    render();
}



function onWindowResize(){
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
