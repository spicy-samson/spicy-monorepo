import { db } from "./firebase";

async function testFirestore() {
  try {
    // Create a test document
    const testDocRef = db.collection("testCollection").doc("hello");
    await testDocRef.set({ message: "Firebase is working!" });

    // Read the document back
    const doc = await testDocRef.get();
    if (!doc.exists) {
      console.log("❌ Document does not exist!");
    } else {
      console.log("✅ Document fetched successfully:", doc.data());
    }

    // Delete the test document
  } catch (err) {
    console.error("❌ Firebase test failed:", err);
  }
}

testFirestore();
