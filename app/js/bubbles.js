(function(){
  'use strict';

  var container;

  var camera, scene, renderer;
  var cameraCube, sceneCube;

  var mesh, zmesh, lightMesh, geometry;
  var spheres = [];

  var directionalLight, pointLight;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  init();
  animate();

  function init() {

    // Create WebGL container
    container = document.createElement( 'div' );
    container.id = 'bubbles';
    document.body.appendChild( container );

    // Create cameras
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.z = 3200;
    cameraCube = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );

    // Create sceens
    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();


    // Create WebGL circles
    var geometry = new THREE.SphereGeometry( 100, 32, 16 );

    // Define image paths
    var path = "images/rainbow-squish/";
    var format = '.png';
    var urls = [
      path + 'posx' + format, path + 'negx' + format,
      path + 'posy' + format, path + 'negy' + format,
      path + 'posz' + format, path + 'negz' + format
    ];

    // Add background textures to circles
    var textureCube = new THREE.CubeTextureLoader().load( urls );

    // Create a FresnelShader
    var shader = THREE.FresnelShader;
    var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
    uniforms[ "tCube" ].value = textureCube;

    var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms };
    var material = new THREE.ShaderMaterial( parameters );

    /**
     * @author mrdoob / http://mrdoob.github.io/three.js/examples/webgl_materials_shaders_fresnel.html
     *
     * Thank you! <3
     */
    for ( var i = 0; i < 100; i ++ ) {

      var mesh = new THREE.Mesh( geometry, material );

      // Randomly position bubbles
      mesh.position.x = Math.random() * 6000 - 5000;
      mesh.position.y = Math.random() * 6000 - 5000;
      mesh.position.z = Math.random() * 6000 - 5000;

      // Randomly size bubbles
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

      // Put circles in the WebGL container
      scene.add( mesh );
      spheres.push( mesh );
    }

    // Create Skybox
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;

    var material = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      side: THREE.BackSide
    });

    // Create Cube
    mesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000 ), material );
    sceneCube.add( mesh );


    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    container.appendChild( renderer.domElement );

    // Resize WebGL on browser resize
    window.addEventListener( 'resize', onWindowResize, false );

  }

  // Recalculate positions and sizes
  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    cameraCube.aspect = window.innerWidth / window.innerHeight;
    cameraCube.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {
    window.requestAnimationFrame( animate );
    render();
  }

  function render() {
    // Create a timer
    var timer = 0.00005 * Date.now();

    // Move circles on animation
    for ( var i = 0, il = spheres.length; i < il; i ++ ) {
      var sphere = spheres[ i ];
      sphere.position.x = 5000 * Math.cos( timer + i );
      sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );
    }

    renderer.clear();
    renderer.render( sceneCube, cameraCube );
    renderer.render( scene, camera );
  }
})();
