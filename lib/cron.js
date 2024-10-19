// import cron from "node-cron";
// import fetch from "node-fetch";

// // Schedule the job to run at 3 PM every day
// cron.schedule("28 16 * * *", async () => {
//   try {
//     console.log("Cron job started: Updating pending gigs.");

//     // Make a request to the GET route you provided
//     const response = await fetch("http://localhost:3000/api/updatePending"); // Update with your actual API endpoint
//     const data = await response.json();

//     if (data.success) {
//       console.log(data.message);
//     } else {
//       console.error("Error updating gigs:", data.error);
//     }
//   } catch (error) {
//     console.error("Cron job error:", error);
//   }
// });

// console.log("Cron job scheduled to run at 3 PM every day.");

import cron from "node-cron";

import connectDb from "./connectDb";
import Gig from "@/models/gigs";

// Schedule the job to run every hour (you can adjust this as needed)
cron.schedule("0 * * * *", async () => {
  try {
    await connectDb();

    // Get the current time
    const now = new Date();

    // Calculate the cutoff time (10 hours ago)
    const cutoffTime = new Date(now.getTime() - 10 * 60 * 60 * 1000);

    // Log the cutoff time for debugging
    console.log("Cutoff Time:", cutoffTime);

    // Find gigs that are still pending and were updated to isPending true more than 10 hours ago
    const query = {
      isPending: true,
      isTaken: false,
      updatedAt: { $lte: cutoffTime }, // Assuming you have an updatedAt field
    };

    console.log("Query:", query);

    // Update the gigs that meet the criteria
    const result = await Gig.updateMany(query, {
      $set: { isPending: false, bookedBy: null, updatedAt: new Date() },
    });

    console.log(`${result.modifiedCount} gigs updated after 10 hours.`);
  } catch (error) {
    console.error("Error updating gigs:", error);
  }
});
