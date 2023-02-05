import { AfterViewInit, Component, ElementRef, NgZone, OnInit, VERSION, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasElement!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      //  this.buildCube();
      // this.buildMesh();
      this.buildCar();
    })
  }

  public buildCube() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({canvas: this.canvasElement.nativeElement});
    renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      renderer.setSize(window.innerWidth, window.innerHeight);
    })
  }

  public buildMesh() {
    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#09042c')

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: this.canvasElement.nativeElement } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    // document.body.appendChild( renderer.domElement );

    // animation

    const controls = new OrbitControls( camera, renderer.domElement );
    // camera.position.set( 0, 20, 100 );
    controls.update();

    function animation() {

      // mesh.rotation.x += 0.01;
      // mesh.rotation.y += 0.01;

      renderer.render( scene, camera );

    }

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      renderer.setSize(window.innerWidth, window.innerHeight);
    })
  }

  public buildCar() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 1, 5000 );
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 800;
    camera.position.y = 100;
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: this.canvasElement.nativeElement } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    //// add rotation controls
    const controls = new OrbitControls( camera, renderer.domElement );
    // controls.addEventListener('change', () => {
    //   animate();
    // });
    controls.update();

    // addming light
    let hlight = new THREE.AmbientLight (0x404040,100);
    scene.add(hlight);
    
    let directionalLight = new THREE.DirectionalLight(0xffffff,100);
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    let light = new THREE.PointLight(0xc4c4c4,10);
    light.position.set(0,300,500);
    scene.add(light);
    
    let light2 = new THREE.PointLight(0xc4c4c4,10);
    light2.position.set(500,100,0);
    scene.add(light2);
    
    let light3 = new THREE.PointLight(0xc4c4c4,10);
    light3.position.set(0,100,-500);
    scene.add(light3);
    
    let light4 = new THREE.PointLight(0xc4c4c4,10);
    light4.position.set(-500,300,500);
    scene.add(light4);
    //////////////////////////////////

    // loading model
    let loader = new GLTFLoader();
    loader.load("../assets/3dModels/gltf-models/car/scene.gltf", (gltf) => {
      let car = gltf.scene.children[0];
      car.scale.set(0.5,0.5,0.5);
      scene.add(gltf.scene);
      animate();
    })
    ////

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

  }
}
