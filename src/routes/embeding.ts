import { Router , type Request, type Response} from "express";
import { pipeline } from '@xenova/transformers';

const router = Router();
console.log("Embedding router initialized.");
router.post('/embed',  async (req: Request, res: Response) => {
	console.log("triggered");
	const text = req.body.prompt;
	const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

	const output = await extractor(text, { pooling: 'mean', normalize: true });
	console.log("Embedding:", output.data);
	console.log("Embedding dimension:", output.data.length);
	res.send(output.data);
});



export default router;
