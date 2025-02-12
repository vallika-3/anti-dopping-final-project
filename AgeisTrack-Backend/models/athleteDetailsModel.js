import mongoose from "mongoose";

const athleteDetailsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    uniqueAthleteID: {
        type: String,
        required: true,
        unique: true
    },
    parametersMonitored: {
        type: [String],
        required: true
    },
    collectionMethod: {
        type: String,
        required: true
    },
    collectionFrequency: {
        type: String,
        required: true
    },
    medicalProfessional: {
        type: String,
        required: true
    },
    testingMethods: {
        type: String,
        required: true
    },
    thresholdLevels: {
        testosterone: {
            type: String,
            required: true
        },
        epo: {
            type: String,
            required: true
        }
    },
    alertsFlags: {
        type: String,
        default: 'None'
    },
    thresholdViolations: {
        type: String,
        default: 'None'
    },
    potentialDoping: {
        type: String,
        default: 'No'
    },
    regulatoryCompliance: {
        type: String,
        required: true
    },
    verification: {
        type: String,
        required: true
    },
    recordUpdates: {
        type: String,
        required: true
    },
    reviewCycle: {
        type: String,
        required: true
    },
    athleteId: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('athlete_details', athleteDetailsSchema);