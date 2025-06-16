import { Router , type Request, type Response} from "express";
import { pipeline } from '@xenova/transformers';

const router = Router();
router.post('/embed',  async (req: Request, res: Response) => {
	const text = req.body.prompt;
	const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

	const output = await extractor(text, { pooling: 'mean', normalize: true });
	const floatArray = output.data as number[];

	const float32Buffer = new Float32Array(floatArray);

	const buffer = Buffer.from(float32Buffer.buffer);

	res.setHeader('Content-Type', 'application/octet-stream');
	res.send(buffer);
});



export default router;
