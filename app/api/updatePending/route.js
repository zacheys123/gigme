import connectDb from "@/lib/connectDb";
import Gig from "@/models/gigs";

export async function GET(req) {
  try {
    await connectDb();

    const now = new Date();

    // const startOfDay = new Date(
    //   Date.UTC(
    //     now.getUTCFullYear(),
    //     now.getUTCMonth(),
    //     now.getUTCDate(),
    //     0,
    //     0,
    //     0
    //   )
    // );
    // const endOfDay = new Date(
    //   Date.UTC(
    //     now.getUTCFullYear(),
    //     now.getUTCMonth(),
    //     now.getUTCDate(),
    //     23,
    //     59,
    //     59,
    //     999
    //   )
    // );

    // console.log("Start of Day:", startOfDay);
    // console.log("End of Day:", endOfDay);

    // Log the query to check what we are trying to match
    const query = {
      isPending: true,
      isTaken: false,
    };
    console.log("Query:", query);

    // Use find to debug if gigs match the criteria
    const gigs = await Gig.find(query);
    console.log("Matching Gigs:", gigs); // Log the matching gigs

    // Now perform the update
    const result = await Gig.updateMany(query, {
      $set: { isPending: false, bookedBy: null },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `${result.modifiedCount} gigs updated.`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
