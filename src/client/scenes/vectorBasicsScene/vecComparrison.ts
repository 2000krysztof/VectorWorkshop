import type VectorVisualizer from "../../utils/vectorVisualizer";

export default interface VecComparrison{
	arrowA:VectorVisualizer;
	arrowB:VectorVisualizer;
	draw():void;
	drawValue(ctx: CanvasRenderingContext2D):void;
	calculate():number;
}
