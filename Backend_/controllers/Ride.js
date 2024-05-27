const Ride = require('../models/Ride');
const User = require('../models/User');

exports.createRide = async (req, res) => {
  try {
    const { origin, destination } = req.body;
    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        message: "Origin and destination details are required",
      });
    }
    //console.log('User from req.user:', req.user);
    const ride = new Ride({ user: req.user.id, origin, destination });
    await ride.save();
    return res.status(201).json({
      success: true,
      message: "Ride created successfully",
      ride,
    });
   // console.log("Ride created");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating ride",
      error: error.message,
    });
  }
};

// exports.getCurrentRideForDriver = async (req, res) => {
//     try {
//       const ride = await Ride.findOne({ driver: req.user._id, status: { $in: ['accepted', 'pending'] } }).populate('user', 'firstname lastname');
//       if (!ride) {
//         return res.status(200).json({ success: true, message: 'No ongoing ride', ride: null });
//       }
//       res.status(200).json({ success: true, ride });
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Error fetching current ride', error: error.message });
//     }
//   };
// exports.getCurrentRideForDriver = async (req, res) => {
//     try {
//         const ride = await Ride.findOne({
//             driver: req.user._id,
//             status: { $in: ['accepted', 'pending'] }
//         }).populate('user', 'firstname lastname');
//         if (!ride) {
//             return res.status(200).json({ success: true, message: 'No ongoing ride', ride: null });
//         }
//         res.status(200).json({ success: true, ride });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error fetching current ride', error: error.message });
//     }
// };



exports.getCurrentRide = async (req, res) => {
  try {
    //console.log(req.user.id);
    // const ride = await Ride.findOne({ user: req.user.id,status: { $in: ['pending', 'accepted'] }
    //                 }).populate('user driver');
    const ride = await Ride.findOne({ user: req.user.id,status: { $in: ['pending', 'accepted'] }
                    }).populate('user driver');
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "No current ride found",
      });
    }
   // console.log(ride);
    return res.status(200).json({
      success: true,
      ride,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching current ride",
      error: error.message,
    });
  }
};


exports.acceptRide = async (req, res) => {
    try {
      const ride = await Ride.findOneAndUpdate(
        { _id: req.params.id, status: 'pending' },
        { status: 'accepted', driver: req.user.id },
        { new: true }
      ).populate('driver', 'firstname lastname');
  
      if (!ride) {
        return res.status(404).json({
          success: false,
          message: "Ride not found or already accepted",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Ride accepted successfully",
        ride,
      });
    } catch (error) {
     // console.error('Error accepting ride:', error); // Log the error for debugging
      return res.status(500).json({
        success: false,
        message: "Error accepting ride",
        error: error.message,
      });
    }
  };
  

// exports.completeRide = async (req, res) => {
//     try {
//       const ride = await Ride.findOne({ _id: req.params.id, status: 'accepted', driver: req.user.userId });
//       if (!ride) {
//         return res.status(404).json({
//           success: false,
//           message: "Ride not found or already completed",
//         });
//       }
//       ride.status = 'completed';
//       await ride.save();
//       return res.status(200).json({
//         success: true,
//         message: "Ride completed successfully",
//         ride,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Error completing ride",
//         error: error.message,
//       });
//     }
//   };
exports.completeRide = async (req, res) => {
    try {
      const ride = await Ride.findOne({ _id: req.params.id, status: 'accepted', driver: req.user.id });
      if (!ride) {
        return res.status(404).json({
          success: false,
          message: "Ride not found or already completed",
        });
      }
      ride.status = 'completed';
      await ride.save();
      return res.status(200).json({
        success: true,
        message: "Ride completed successfully",
        ride,
      });
    } catch (error) {
      //console.error('Error completing ride:', error); // Log the error for debugging
      return res.status(500).json({
        success: false,
        message: "Error completing ride",
        error: error.message,
      });
    }
  };
  

  

// exports.completeRide = async (req, res) => {
//   try {
//     const ride = await Ride.findOne({ _id: req.params.id, status: 'accepted', driver: req.user.userId });
//     if (!ride) {
//       return res.status(404).json({
//         success: false,
//         message: "Ride not found or already completed",
//       });
//     }
//     ride.status = 'completed';
//     await ride.save();
//     return res.status(200).json({
//       success: true,
//       message: "Ride completed successfully",
//       ride,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error completing ride",
//       error: error.message,
//     });
//   }
// };

// exports.acceptRide = async (req, res) => {
//     try {
//       const ride = await Ride.findOneAndUpdate(
//         { _id: req.params.id, status: 'pending' },
//         { status: 'accepted', driver: req.user._id },
//         { new: true }
//       ).populate('user', 'firstname lastname');
//       if (!ride) {
//         return res.status(404).json({ success: false, message: 'Ride not found or already accepted' });
//       }
//       res.status(200).json({ success: true, ride });
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Error accepting ride', error: error.message });
//     }
//   };
  
//   exports.completeRide = async (req, res) => {
//     try {
//       const ride = await Ride.findOneAndUpdate(
//         { _id: req.params.id, driver: req.user._id, status: 'accepted' },
//         { status: 'completed' },
//         { new: true }
//       );
//       if (!ride) {
//         return res.status(404).json({ success: false, message: 'Ride not found or already completed' });
//       }
//       res.status(200).json({ success: true, message: 'Ride completed successfully' });
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Error completing ride', error: error.message });
//     }
//   };

exports.getAvailableRides = async (req, res) => {
    try {
      const rides = await Ride.find({ status: 'pending' }).populate('user','firstname lastname');
      //console.log(rides);
      if (rides.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'No available rides at the moment.'
        });
      }
      return res.status(200).json({
        success: true,
        rides: rides
      });
    } catch (error) {
       // console.error('Error fetching available rides:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching available rides.',
        error: error.message
      });
    }
  };
  

// exports.getRideHistory = async (req, res) => {
//   try {
//     const rides = await Ride.find({ $or: [{ user: req.user.id }, { driver: req.user.id }] }).populate('user driver');
//     return res.status(200).json({
//       success: true,
//       user:req.user.id,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching ride history",
//       error: error.message,
//     });
//   }
// };
exports.getRideHistory = async (req, res) => {
    try {
      
      const rides = await Ride.find({ $or: [{ user: req.user.id }, { driver: req.user.id }] }).populate('user driver', 'firstname lastname');
       // console.log(rides);
      return res.status(200).json({
        success: true,
        rides, 
        

      });
    } catch (error) {
      console.error('Error fetching ride history:', error); // Log the error for debugging
      return res.status(500).json({
        success: false,
        message: "Error fetching ride history",
        error: error.message,
      });
    }
  };
  
