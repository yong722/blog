---
title: threejs模型导入及操作（vue）
date: 2021-11-10 00:00:00
tags: 
  - threejs
category: 
  - threejs
categories: []
---
+ 安装
```js
   npm install three --save
   npm i import-three-examples --save-dev
```
+ 引入（根据需求选择）
```js
   import * as THREE from "three";
   import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // 控制器
   import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"; // obj格式文件加载
   import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"; // 材质mtl文件导入
   import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";//gltf格式
   import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
   import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
   import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
   import Stats from "three/examples/js/libs/stats.min.js"; // 检测动画运行时的帧数
```
+ 创建环境
```js
    
   var scene = new THREE.Scene();
   this.scene=scene;// 不要在data中定义scene
      // 摄像机
    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 10;
      // 相机观看目标点         //三位向量
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      // 设置环境光源
      var ambient = new THREE.AmbientLight(0xffffff);
      // 点光源
      var pointLight = new THREE.PointLight(0xffffff, 1, 10);
      // 平行光
      // var directionalLight = new THREE.DirectionalLight(0xffffff);
      // 聚光灯
      // var spotLight = new THREE.SpotLight(0xffffff, 1, 1000);
      // scene.add(directionalLight);
      scene.add(ambient);
      scene.add(pointLight);
      var hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
      hemiLight.position.set(0, 100, 0); //这个也是默认位置
      scene.add(hemiLight);
      scene.add(camera);
      var stats = new Stats();
      let timer = setInterval(() => {
        stats.begin();
        renderer.render(scene, camera);
        stats.end();
      }, 20);
      // 渲染器
      var renderer = new THREE.WebGLRenderer();
```
+ 模型转换及压缩
```
      npm install -g obj2gltf 
      //obj转gltf(model.obj-需要转换的模型，model.gltf-转换后的模型)
      obj2gltf -i model.obj -o model.gltf  
      npm install -g gltf-pipeline
      //压缩gltf(model.gltf-需要压缩的模型，modelDraco.gltf-压缩后的模型)
      gltf-pipeline -i model.gltf -o modelDraco.gltf -d
```
+ 导入模型及简单功能
```js
    //   导入gltf文件
    // 引入模块
      // let gltfLoader = new GLTFLoader();
      // let dracoLoader = new DRACOLoader();
      // dracoLoader.setDecoderPath("/static/libs/draco/gltf/"); // 这个是加载draco算法，这样才能解析压缩后的gltf模型格式.
      // gltfLoader.setDRACOLoader(dracoLoader);
      // 若是压缩后的gltf需加上上面4步
      new GLTFLoader().load("/static/xxx.gltf", (obj) => {
        scene.add(obj.scene);
      });

    //   导入FBX文件
      new FBXLoader().load("/static/xxx.FBX", (obj) => {
        obj.scale.set(0.01, 0.01, 0.01);
        obj.position.set(0, 0, 0);
        scene.add(obj);
      });
    //   导入stl文件
      new STLLoader().load(
        "/static/xxx.stl",
        (geometry) => {
          //创建纹理
          var mat = new THREE.MeshLambertMaterial({ color: 0x00ffff });
          var mesh = new THREE.Mesh(geometry, mat);
          mesh.rotation.x = -0.5 * Math.PI; //将模型摆正
          mesh.scale.set(0.0001, 0.0001, 0.0001); //缩放
          mesh.position.set(0, 1, 0);
          geometry.center(); //居中显示
          scene.add(mesh);

        }
      );
    // 导入obj+mtl（贴图流动+创建精灵）
    new MTLLoader().load("/static/xxx.mtl", async (materials) => {
        materials.preload();
        new OBJLoader()
          .setMaterials(materials)
          .load("/static/xxx.obj", async (obj) => {
            obj.scale.set(0.005, 0.005, 0.005);
            obj.rotation.x = -0.6;
            obj.rotation.z = -0.2;
            scene.add(obj);
            // 河流流动
            obj.traverse((child) => {
              if (child instanceof THREE.Mesh && child.name === "heliu") {
                // 纹理动画
                function textureAnimation(texture) {
                  renderer.render(scene, camera); //执行渲染操作
                  requestAnimationFrame(() => textureAnimation(texture));
                  // 使用加减法可以设置不同的运动方向
                  // 设置纹理偏移
                  texture.offset.y += 0.02;
                }
                textureAnimation(child.material.map);
              }
            });
            let group = new THREE.Group();
            // 创建精灵标签
            await obj.children.forEach((item) => {
                //模型隐藏
                //item.material.visible = false;
                // 获取区域中心点作为精灵位置（一般用于地图标注）
              item.geometry.computeBoundingBox();
              var centroid = new THREE.Vector3();
              centroid.addVectors(
                item.geometry.boundingBox.min,
                item.geometry.boundingBox.max
              );
              centroid.multiplyScalar(0.5);

              centroid.applyMatrix4(item.matrixWorld);
              // 创建精灵
              group.add(
                this.createSpriteText(
                  centroid.x,
                  centroid.y,
                  centroid.z,
                  item.name
                )
              );
              scene.add(group);
            });
            // 监听点击射线与精灵或者模型相交
            let mouse = new THREE.Vector2();
            var raycaster = new THREE.Raycaster();
            window.addEventListener("click", (e) => {
              this.control(
                e,
                mouse,
                raycaster,
                scene,
                obj,
                renderer,
                camera,
                group
              );
            });
          });
      });
    
```
+ 简单功能
```js
  // 精灵
    createSpriteText(x, y, z, text) {
      //先用画布将文字画出
      let group = new THREE.Group();
      let canvas = document.createElement("canvas");
      canvas.width = 120;
      canvas.height = 20;
      canvas.style.textAlign = "center";
      canvas.style.lineHeight = "20px";
      canvas.background = "red";
      let ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.font = "Bold 12px Arial";
      ctx.fillText(text, 0, 10);
      let texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      //使用Sprite显示文字
      let material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      let textObj = new THREE.Sprite(material);
      textObj.position.set(0, 0, 0);
      textObj.position.set(0.2, -0.05, 0);
      textObj.scale.set(1.3, 0.3, 1);
      group.add(textObj);
      group.position.set(x + 0.5, y + 0.7, z + 1.5);
      return group;
    }

    // window点击事件（控制模块和标签）
    control(e, mouse, raycaster, scene, obj, renderer, camera, group) {
      e.stopPropagation();
      let clientx = e.x;
      let clienty = e.y;
      mouse.x =
        (e.clientX / document.getElementById("container").clientWidth) * 2 - 1;
      mouse.y =
        -(e.clientY / document.getElementById("container").clientHeight) * 2 +
        1;
      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      raycaster.setFromCamera(mouse, camera);
      // 获取raycaster直线和所有模型相交的数组集合
      // 与精灵相交
      var intersects = raycaster.intersectObjects(group.children);
      // 与模型相交
      var intersects2 = raycaster.intersectObjects(scene.children[4].children)
    }


    // 控制相机
    cameracontrols(camera, renderer, scene) {
      // 控制相机
      var controls = new OrbitControls(camera, renderer.domElement);
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      controls.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      //controls.dampingFactor = 0.25;
      //是否可以缩放
      controls.enableZoom = true;
      //是否自动旋转
      controls.autoRotate = true;
      //设置相机距离原点的最远距离
      controls.minDistance = 1;
      //设置相机距离原点的最远距离
      controls.maxDistance = 400;
      //是否开启右键拖拽
      controls.enablePan = true;
      // 设置背景色/场景
      renderer.setClearColor("#000", 1.0);
      renderer.setSize(
        document.getElementById("container").clientWidth,
        document.getElementById("container").clientHeight
      );
      document.getElementById("container").appendChild(renderer.domElement);
      renderer.render(scene, camera);
    }

     // 边缘泛光
    outlineObj(selectedObjects, renderer, scene, camera) {
      let composer = new EffectComposer(renderer); // 特效组件
      var renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass); // 特效渲染
      let outlinePass = new OutlinePass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        scene,
        camera
      );
      composer.addPass(outlinePass); // 加入高光特效
      // outlinePass.pulsePeriod = 6; //数值越大，律动越慢
      outlinePass.visibleEdgeColor.set(0xff0202); // 高光颜色
      outlinePass.hiddenEdgeColor.set(0xfad184); // 阴影颜色
      outlinePass.usePatternTexture = false; // 使用纹理覆盖？
      outlinePass.edgeStrength = 8; // 高光边缘强度
      outlinePass.edgeGlow = 0.1; // 边缘微光强度
      outlinePass.edgeThickness = 8; // 高光厚度
      outlinePass.selectedObjects = selectedObjects; // 需要高光的obj
      animate();
      function animate() {
        // 设置动画接收id,方便清除
        this.anitmate1=requestAnimationFrame(animate);
        // controls.update();
        if (composer != null) {
          composer.render();
        }
      }
    }
    // 创建label(和精灵差不多，但可以在html中创建div，方便设置样式)
    place(item, x, y, z) {
      if (item) {
        var testDiv = document.getElementById(item.name);
        var moonLabel = new CSS2DObject(testDiv);
        moonLabel.name = item.name;
        // moonLabel.name = item.name + "_label";
        //前两个参数是对于屏幕xy坐标,可以取负数  第三个不清楚,按道理应该是z轴坐标,不知道怎么体现
        moonLabel.position.set(x + 0.3, y + 0.78, z + 1);
        moonLabel.visible = false;
      } else {
        var testDiv = document.getElementById("jiantou");
        var moonLabel = new CSS2DObject(testDiv);
        moonLabel.name = "jiantou";
        //前两个参数是对于屏幕xy坐标,可以取负数  第三个不清楚,按道理应该是z轴坐标,不知道怎么体现
        // moonLabel.position.set(x + 0.09, y + 0.58, z + 1);
        moonLabel.position.set(x, y, z);
      }
      return moonLabel;
    },
    // 加载状态材质(可用于材质替换)
    new THREE.TextureLoader().load(
      "/static/BaoNing/baoningB.jpg",
      (texture) => {
        this.texture = texture;
      }
    );
    // 选择模型替换材质（item->模型）
    // item.material.map = this.texture
```
+ 销毁
```js
// 清除所有动画和scene缓存
  destroyed() {
    cancelAnimationFrame(this.anitmate1);
    this.removeObj(this.scene);
    this.clearScene(this.scene.children);
    this.camera = null;
    this.renderer.renderLists.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.content = null;
    this.renderer.domElement = null;
    this.renderer = null;
    this.scene.remove();
    this.scene = null;
    THREE.Cache.clear();
  }

      // 清除缓存
    removeObj(obj) {
      let arr = obj.children.filter((x) => x);
      arr.forEach((item) => {
        if (
          item instanceof THREE.Mesh ||
          item instanceof THREE.Group ||
          item.type == "Object3D"
        ) {
          if (item.children.length) {
            this.removeObj(item);
          } else {
            if (item.geometry) {
              item.geometry.dispose();
            }
            if (item.material) {
              if (Array.isArray(item.material)) {
                item.material.forEach((ele) => {
                  ele.dispose();
                });
              } else {
                item.material.dispose();
              }
            }
            this.scene.remove(item);
          }
        } else {
          this.scene.remove(item);
        }
      });
    },
    clearScene(myObjects) {
      // 从scene中删除模型并释放内存
      if (myObjects.length > 0) {
        for (var i = 0; i < myObjects.length; i++) {
          var currObj = myObjects[i];

          // 判断类型
          if (currObj instanceof THREE.Scene) {
            var children = currObj.children;
            for (var i = 0; i < children.length; i++) {
              this.deleteGroup(children[i]);
            }
          } else {
            this.deleteGroup(currObj);
          }
          this.scene.remove(currObj);
        }
      }
    },
    deleteGroup(group) {
      //console.log(group);
      if (!group) return;
      // 删除掉所有的模型组内的mesh
      group.traverse(function (item) {
        if (item instanceof THREE.Mesh) {
          if (item.geometry) {
            item.geometry.dispose();
          }
          // item.material.dispose(); // 删除材质
          if (item.material) {
            if (Array.isArray(item.material)) {
              item.material.forEach((ele) => {
                ele.dispose();
              });
            } else {
              item.material.dispose();
            }
          }
        }
      });
    },
```
<!-- ### 评论
<Vssue /> -->


