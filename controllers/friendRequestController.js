const User=require("../models/userSchema");
const FriendRequest=require("../models/requestSchema");

const checkExistingFriendRequest=async(req,status) =>{
    try{
        const checkExistence=await FriendRequest.find({
            $and:[
                {
                    $and:[
                        {senderID:req.body.senderID},
                        {receiverID:req.body.receiverID}
                    ]
                },
                {requestStatus:{$eq:status}}
            ]
        })
        
        //return checkExistence.length !==0; //returns true if there is at least one user, else false 
        return checkExistence.length; //returns an integer, 0 means no request found, else request's are found based on status
    }catch(error){
        console.log(error);
    }
};

const limitRequests=async(req,status,maxNumberOfRequests)=>{
    try{
        const requests=await checkExistingFriendRequest(req,status);

        return requests>maxNumberOfRequests; // returns true, indicating that the limit has been exceeded; otherwise, it returns false.
    }catch(error){
        console.log(error);
    }
};

const sendFriendRequest = async (senderID, receiverID) => {
    try {
        // Check if the sender and receiver exist
        const sender = await User.findById(senderID);
        const receiver = await User.findById(receiverID);

        if (!sender || !receiver) {
            throw new Error("Sender or receiver does not exist");
        }

        // Check if a request between these users already exists
        const existingRequest = await checkExistingFriendRequest(req,status);
        if (existingRequest>0) {
            throw new Error("Friend request already sent");
        }

        // Create and save the friend request
        const newRequest = new FriendRequest({
            senderID: req.body.senderID,
            receiverID: req.body.receiverID,
            status: req.body.status
        });

        const savedRequest = await newRequest.save();

        return savedRequest;
    } catch (error) {
        console.log(error);
    }
};

const acceptFriendRequest = async (requestID) => {
    try {
        // Find the friend request by its ID
        const friendRequest = await FriendRequest.findById(requestID);

        // If the request doesn't exist, throw an error
        if (!friendRequest) {
            throw new Error("Friend request not found");
        }
        
        // Update the status of the friend request to 'accepted'
        friendRequest.requestStatus = "accepted";

        // Save the updated friend request
        const updatedRequest = await friendRequest.save();

        // Return the updated friend request
        return updatedRequest;
    } catch (error) {
        console.log(error);
    }
};

const deleteOrCancelFriendRequest = async (req,status) => {
    try {
        // Check if a request between these users does not exist
        const existingRequest = await checkExistingFriendRequest(req,status);
        if (existingRequest==0) {
            return false;
        }

        if (status === "pending") {
            // If the status is pending, cancel the friend request
            friendRequest.requestStatus = "cancelled";
            await friendRequest.save(); // Save the updated status
            return "Friend request cancelled successfully";
        } else {
            // If the status is other than pending, delete the friend request
            await friendRequest.remove(); // Delete the friend request
            return "Friend request deleted successfully";
        }
    } catch (error) {
        console.log(error);
    }
};




