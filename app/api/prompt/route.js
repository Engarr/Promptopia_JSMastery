import connectToDb from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req) => {
  try {
    await connectToDb();
    const prompt = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new Response('Failed to fetch prompts', {
      status: 500,
    });
  }
};
