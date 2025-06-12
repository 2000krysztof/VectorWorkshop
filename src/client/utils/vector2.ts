export default class Vector2{

	x: number;
	y: number;



	constructor(x:number,y:number){
		this.x = x;
		this.y = y;
	}


	addTo(other:Vector2){
		this.x += other.x;
		this.y += other.y;
	}

	add(other:Vector2):Vector2{
		return new Vector2(this.x+other.x, this.y + other.y);
	}


	subtractFrom(other:Vector2){
		this.x -= other.x;
		this.y -= other.y;
	}

	subtract(other:Vector2){
		return new Vector2(this.x-other.x, this.y - other.y);
	}

	multiplyBy(times:number){
		this.x *= times;
		this.y *= times;
	}

	multiply(times:number){
		return new Vector2(this.x*times, this.y*times);
	}

	normalized():Vector2{
		const vec = new Vector2(this.x,this.y);
		vec.multiplyBy(1/this.magnitude());
		return vec;
	}

	magnitude():number{
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}


	angle():number{
		const n = this.normalized();
		return Math.atan2(n.y,n.x);
	}

	static angleToVec(angle:number):Vector2{
		const x = Math.cos(angle);
		const y = Math.sin(angle);
		return new Vector2(x,y);

	}


}
