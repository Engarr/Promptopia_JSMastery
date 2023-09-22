import connectToDb from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.find({ creator: params.id }).populate(
      'creator'
    );

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new Response('Failed to fetch prompts', {
      status: 500,
    });
  }
};
