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
	lerp(end: Vector2, t: number): Vector2 {
		const newX = this.x + (end.x - this.x) * t;
		const newY = this.y + (end.y - this.y) * t;
		return new Vector2(newX, newY);
	}

	static lerp(start: Vector2, end: Vector2, t: number): Vector2 {
		const newX = start.x + (end.x - start.x) * t;
		const newY = start.y + (end.y - start.y) * t;
		return new Vector2(newX, newY);
	}

	static dot(a:Vector2, b:Vector2): number{
		return a.x * b.x + a.y * b.y;
	}

}
