export abstract class Scene{
	abstract start():void;
	abstract update(deltaTime:number):void;
}


class SceneManager{
	
	activScene!:Scene;



	setScene(scene:Scene){
		scene.start();
		this.activScene = scene;
	}

	update(deltaTime:number){
		this.activScene.update(deltaTime);
	}
}

const sceneManager = new SceneManager();
export default sceneManager;
