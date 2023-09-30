import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req) => {

    try {
        await connectToDB();
        const prompts = await Prompt.find().populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200, headers: { 'content-type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ "Error": "Failed to fetch prompts" }), { status: 404 });
    }
};