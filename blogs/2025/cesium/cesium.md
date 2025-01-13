---
title: cesium模型导入及操作（vue）
date: 2025-01-13 00:00:00
tags:
  - cesium
category:
  - cesium
categories: []
---
+ 安装
```js
   npm install cesium --save
   npm i vite-plugin-cesium --save-dev  //vue3+vite
```

+ 引入
```js
    import * as Cesium from "cesium";
```
+ 模型格式转换工具
```
    1.: GISBOX     https://www.gisbox.com/
    2.: DasViewer  https://www.daspatial.com/cn/dasviewer
    3.: 灵易智模    https://www.lingyisc.cn/products/service
```

+ 使用
```js
// 创建类 (也可根据需求初始化)
class UseCesium {
	constructor() {
		this.viewer = null;
		this.handler = null;
		this.skyBoxConfig = {
			default: undefined,
			1: {//"蓝天"
				positiveX: "./skybox/lantian/Right.jpg",
				negativeX: "./skybox/lantian/Left.jpg",
				positiveY: "./skybox/lantian/Front.jpg",
				negativeY: ".//skybox/lantian/Back.jpg",
				positiveZ: ".//skybox/lantian/Up.jpg",
				negativeZ: ".//skybox/lantian/Down.jpg",
			},
			2: {//"晚霞"
				positiveX: ".//skybox/wanxia/SunSetRight.png",
				negativeX: ".//skybox/wanxia/SunSetLeft.png",
				positiveY: ".//skybox/wanxia/SunSetFront.png",
				negativeY: ".//skybox/wanxia/SunSetBack.png",
				positiveZ: ".//skybox/wanxia/SunSetUp.png",
				negativeZ: ".//skybox/wanxia/SunSetDown.png",
			},
			3: {//"晴天"
				positiveX: ".//skybox/qingtian/rightav9.jpg",
				negativeX: ".//skybox/qingtian/leftav9.jpg",
				positiveY: ".//skybox/qingtian/frontav9.jpg",
				negativeY: ".//skybox/qingtian/backav9.jpg",
				positiveZ: ".//skybox/qingtian/topav9.jpg",
				negativeZ: ".//skybox/qingtian/bottomav9.jpg",
			},
		};
	}
	init(params, callback) {
        // params={
        //     id :容器id
        //     terrain :是否展示地形
        //     imgLayer :使用瓦片
        //     skyBox :天空盒子
        //     globe :是否展示地球
        // }
		Cesium.Ion.defaultAccessToken =
			"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";  // 在cesiumIon官网申请
		let viewer = new Cesium.Viewer(params.id, {
			// 是否显示查询按钮
			geocoder: false,
			// 控制查看器的显示模式
			sceneModePicker: false,
			// 是否显示图层选择器
			baseLayerPicker: false,
			// 是否显示帮助
			navigationHelpButton: false,
			animation: false, //是否显示动画控件
			shouldAnimate: true,
			homeButton: false, //是否显示Home按钮
			fullscreenButton: false, //是否显示全屏按钮
			timeline: false, //是否显示时间线控件
			requestRenderMode: true, //启用请求渲染模式
			// scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存
			sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
			fullscreenElement: document.body, //全屏时渲染的HTML元素 暂时没发现用处
			// 地形
			terrain: params.terrain ? Cesium.Terrain.fromWorldTerrain({
				requestVertexNormals: true,
				requestWaterMask: true,
			}) : null,
			undergroundMode: true,
			infoBox: false
		});
		if (params.imgLayer) {
			viewer.imageryLayers.addImageryProvider(this.addAMapImagery(params.imgLayer));
		}

		if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
			//判断是否支持图像渲染像素化处理
			viewer.resolutionScale = window.devicePixelRatio;
		}
		// if(params.terrain){
		// 	viewer.scene.globe.depthTestAgainstTerrain = true;  // 设置true最前最上的物体才可见
		// }
		viewer.scene.fxaa = true;
		viewer.scene.postProcessStages.fxaa.enabled = true;
		// 隐藏版权
		viewer._cesiumWidget._creditContainer.style.display = "none";
		if (params.skyBox) {
			setTimeout(() => {
				viewer.scene.skyBox = new SkyBox({
					sources: this.skyBoxConfig[params.skyBox],
					nearGround: true,
				});
			}, 300);

		}
		if (!params.globe) {
			viewer.scene.globe.show = false;// 是否展示地球
			viewer.scene.skyAtmosphere.show = false;// 是否展示大气光圈
			// 设置地图透明
			// 屏蔽天空盒
			viewer.scene.skyBox.show = false
			viewer.scene.globe.translucency.frontFaceAlpha = 0.5; // 正面透明度
			// 设置背景透明
			viewer.scene.globe.translucency.backFaceAlpha = 0.5 // 应用于地球背面的恒定半透明度
			viewer.scene.skyBox.show = false //去掉天空盒子
			viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0, 0) //设置场景背景色透明，便于显示自定的背景
			// 地球半透明表面
			viewer.scene.globe.translucency.enabled = true
			// 禁用地下着色
			viewer.scene.globe.undergroundColor = undefined
			// 地球上地面大气
			viewer.scene.globe.showGroundAtmosphere = false
			// 设置地球的颜色
			viewer.scene.globe.baseColor = Cesium.Color.TRANSPARENT
			//隐藏太阳
			viewer.scene.globe.enableLighting = false
			viewer.shadows = false
			viewer.scene.sun.show = false //还可以viewer.scene.sun.destroy();
			//月亮
			viewer.scene.moon.show = false
			//大气
			viewer.scene.skyAtmosphere.show = false
			//雾
			viewer.scene.fog.enable = false
		}
		this.viewer = viewer;
		callback(viewer)
		// window.addEventListener('resize', () => {
		// 	viewer.resize();
		// });
	}
    // 导入3D模型 模型格式为3Dtiles (3Dtiles性能更好)
	add(data) {
		return new Promise((resolve, reject) => {
			Cesium.Cesium3DTileset.fromUrl(data.url)
				.then((tileset) => {
					let cameraOffset = data.cameraOffset || {};// 相机偏移
					tileset = this.translation(tileset, data.offset);// 设置模型偏移
					this.viewer.scene.primitives.add(tileset);
					const center = tileset.boundingSphere.center;
                    // 锁定相机视角 让模型始终在视野内
					this.viewer.camera.lookAt(center, new Cesium.Cartesian3(
						cameraOffset.x || 0,
						cameraOffset.y || 0,
						cameraOffset.z || 100
					));
                    // 也可使用lookAtTransform锁定相机视角
                    // let transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
                    // this.viewer.camera.lookAtTransform(transform,new Cesium.Cartesian3(
					// 	cameraOffset.x || 0,
					// 	cameraOffset.y || 0,
					// 	cameraOffset.z || 100
					// ))
					resolve(tileset)
				})
				.catch((error) => {
					console.error("Failed to load 3D Tiles:", error);
					reject(error)
				});
		});
	}

    // 导入3D模型(gltf/glb)
    addGltf(url){
        // fromGltf-fromGltfAsync
        return viewer.scene.primitives.add(
          Cesium.Model.fromGltf({
            url: url,
            show: true,
            scale: 0.001,
            maximumScale: 1,
            loader: "url-loader",
          })
        );
    }
    // 设置标签(html标签)
	setLabel(data) {
        // id:容器id   position:位置经纬度
		const htmloverlay = document.getElementById(data.id);
		htmloverlay.style.display = "block";
		htmloverlay.position = data.position;
		this.viewer.container.appendChild(htmloverlay);
		this.domRander(data);
	}
    // 监听场景渲染
	domRander(data) {
		this.viewer.scene.preRender.addEventListener(() => {
    		const canvasHeight = this.viewer.scene.canvas.height;
    		const dom = document.getElementById(data.id);
    		if (!dom?.position) return;
    		const windowPosition = Cesium.SceneTransforms.worldToWindowCoordinates(
    			this.viewer.scene,
    			dom.position,
    			new Cesium.Cartesian2()
    		);
    		if (!windowPosition) return;
    		const elWidth = dom.offsetWidth; //容器宽度
    		let offsetX = -elWidth / 2;
    		let offsetY = 50; // label线高
    		dom.style.left = windowPosition.x + offsetX + "px";
    		dom.style.top = windowPosition.y - offsetY + "px";
    		// let occ = new Cesium.EllipsoidalOccluder(Cesium.Ellipsoid.WGS84, this.viewer.camera.position);// 判断点位是否在相机范围内
    		// dom.style.display = occ.isPointVisible(dom.position) ? "block" : "none";
		});
	}
	//  模型偏移
	translation(tileset, offset) {
		if (!offset) return tileset;
		// 获取3DTileset模型的外包围球中心点坐标
		let cartographic = Cesium.Cartographic.fromCartesian(
			tileset.boundingSphere.center
		);
		let surface = Cesium.Cartesian3.fromRadians(
			cartographic.longitude,
			cartographic.latitude,
			0
		);

		// 计算偏移后的坐标
		let offsetHeight = Cesium.Cartesian3.fromRadians(
			cartographic.longitude + (offset.x || 0),
			cartographic.latitude + (offset.y || 0),
			(offset.z || 0)
		);
		let translation = Cesium.Cartesian3.subtract(
			offsetHeight,
			surface,
			new Cesium.Cartesian3()
		);
		// 创建一个表示转换的Matrix4
		tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
		return tileset;
	}
    // 模型变换
	update3dtilesMaxtrix(model, params) {
		//旋转
		let mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.rx));
		let my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.ry));
		let mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
		let rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
		let rotationY = Cesium.Matrix4.fromRotationTranslation(my);
		let rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
		//平移
		let position = Cesium.Cartesian3.fromDegrees(
			params.tx,
			params.ty,
			params.tz
		);
		let m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
		//旋转、平移矩阵相乘
		Cesium.Matrix4.multiply(m, rotationX, m);
		Cesium.Matrix4.multiply(m, rotationY, m);
		Cesium.Matrix4.multiply(m, rotationZ, m);
		//赋值给model
		if (Cesium.defined(model.primitive)) {
			model.primitive.modelMatrix = m;
		}
		model.modelMatrix = m;
	}
	// 使用第三方瓦片
	addAMapImagery(type) {
		let tdtLayer;
		switch (type) {
			case 1:
				tdtLayer = new Cesium.UrlTemplateImageryProvider({
					url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
					minimumLevel: 3,
					maximumLevel: 18
				})
				break;
			case 2:
				tdtLayer = new Cesium.UrlTemplateImageryProvider({
					url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
					minimumLevel: 3,
					maximumLevel: 18
				})
				break;
			case 3:
				tdtLayer = new Cesium.UrlTemplateImageryProvider({
					url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
					minimumLevel: 3,
					maximumLevel: 18
				})
				break;
		}
		return tdtLayer
	}
    // 相机运动(带动画)
	flyTo(params) {
		this.viewer.camera.flyTo({
			// fromDegrees()方法，将经纬度和高程转换为世界坐标，这里定位到渔港
			destination: params.position, //114.159, 22.234, 2824
			// destination: Cesium.Cartesian3.fromDegrees(params.x, params.y, params.z), //114.159, 22.234, 2824
			duration: params.duration || 0.5,
			orientation: {
				heading: Cesium.Math.toRadians(0),
				pitch: Cesium.Math.toRadians(params.pitch || 0), // 视角-43
				roll: Cesium.Math.toRadians(0),
			},
		});
	}
    // 点击事件
	sceneClick(callback) {
		this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

		try {
			this.handler.setInputAction((click) => {
				if (!click || !click.position) {
					console.warn('Invalid click event or position');
					return;
				}

				try {
					let cartesian = this.viewer.scene.pickPosition(click.position);
					let pickedObject = this.viewer.scene.pick(click.position);
                    // pickedObject-点击到实物   cartesian-坐标
					if (pickedObject && cartesian) {
						callback({
							position: cartesian,
							detail: pickedObject.detail
						});
					}
				} catch (error) {
					console.error('Error in pick operation:', error);
				}
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		} catch (error) {
			console.error('Error setting input action:', error);
		}
	}
    // 销毁
	cleanup() {
		if (this.handler) {
			this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			this.handler.destroy();
			this.handler = null;
		}
	}
}
```