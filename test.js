import mongoose from "mongoose";
import { Property } from "./models/formModelV2.js"; // adjust path
import { connectDB } from "./utils/connectDB.js";



export const  getPropertyStatsV1 = async() => {
  try {
    const stats = await Property.aggregate([
      {
        $facet: {
          // ----------- TOTALS -----------
          totalProperties: [{ $count: "count" }],
          verifiedProperties: [
            { $match: { isSurveyVerified: true } },
            { $count: "count" },
          ],
          emptyProperties: [
            { $match: { isEmptyProperty: true } },
            { $count: "count" },
          ],
          // ----------- PROPERTY TYPES -----------
          byPropertyType: [
            {
              $group: {
                _id: "$propertyType",
                count: { $sum: 1 },
              },
            },
          ],
          byConstructionType: [
            {
              $group: {
                _id: "$constructionType",
                count: { $sum: 1 },
              },
            },
          ],
          byGender: [
            {
              $group: {
                _id: "$gender",
                count: { $sum: 1 },
              },
            },
          ],
          byReligion: [
            {
              $group: {
                _id: "$religion",
                count: { $sum: 1 },
              },
            },
          ],
          byWard: [
            {
              $group: {
                _id: "$ward",
                count: { $sum: 1 },
              },
            },
          ],
          // ----------- FAMILY & UTILITIES -----------
          familyStats: [
            {
              $group: {
                _id: null,
                totalMale: { $sum: "$addFamilyMembers.male" },
                totalFemale: { $sum: "$addFamilyMembers.female" },
              },
            },
          ],
          utilitiesStats: [
            {
              $group: {
                _id: null,
                waterConnection: {
                  $sum: { $cond: ["$utilities.isWaterConnection", 1, 0] },
                },
                sewerConnection: {
                  $sum: { $cond: ["$utilities.isSewerConnection", 1, 0] },
                },
                submersiblePump: {
                  $sum: { $cond: ["$utilities.isSubmersiblePump", 1, 0] },
                },
                tenantAvailable: {
                  $sum: { $cond: ["$utilities.isTenantAvailable", 1, 0] },
                },
              },
            },
          ],
          // ----------- FLOOR & AREA -----------
          floorStats: [
            {
              $unwind: "$floorsData.floors",
            },
            {
              $group: {
                _id: "$floorsData.floors.classification",
                totalCarpetArea: {
                  $sum: {
                    $add: [
                      "$floorsData.floors.carpetAreaC",
                      "$floorsData.floors.carpetAreaR",
                    ],
                  },
                },
                totalEmptyArea: {
                  $sum: {
                    $add: [
                      "$floorsData.floors.emptyAreaC",
                      "$floorsData.floors.emptyAreaR",
                    ],
                  },
                },
                count: { $sum: 1 },
              },
            },
          ],
          numberOfFloorsStats: [
            {
              $group: {
                _id: "$floorsData.numberOfFloors",
                count: { $sum: 1 },
              },
            },
          ],
          toiletsStats: [
            {
              $group: {
                _id: null,
                totalToilets: { $sum: "$numberOfToilets" },
                avgToilets: { $avg: "$numberOfToilets" },
              },
            },
          ],
          constructionYearStats: [
            {
              $group: {
                _id: null,
                minYear: { $min: "$constructionYear" },
                maxYear: { $max: "$constructionYear" },
                avgYear: { $avg: "$constructionYear" },
              },
            },
          ],
          // ----------- SURVEYOR PERFORMANCE -----------
          surveyorStats: [
            {
              $group: {
                _id: "$surveyor",
                totalSurveys: { $sum: 1 },
                verifiedSurveys: {
                  $sum: { $cond: ["$isSurveyVerified", 1, 0] },
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalProperties: { $arrayElemAt: ["$totalProperties.count", 0] },
          verifiedProperties: { $arrayElemAt: ["$verifiedProperties.count", 0] },
          emptyProperties: { $arrayElemAt: ["$emptyProperties.count", 0] },
          byPropertyType: 1,
          byConstructionType: 1,
          byGender: 1,
          byReligion: 1,
          byWard: 1,
          familyStats: { $arrayElemAt: ["$familyStats", 0] },
          utilitiesStats: { $arrayElemAt: ["$utilitiesStats", 0] },
          floorStats: 1,
          numberOfFloorsStats: 1,
          toiletsStats: { $arrayElemAt: ["$toiletsStats", 0] },
          constructionYearStats: { $arrayElemAt: ["$constructionYearStats", 0] },
          surveyorStats: 1,
        },
      },
    ]);

    return stats[0];
  } catch (err) {
    console.error("Error fetching property stats:", err);
    return null;
  }
}


export const getPropertyStats = async () => {
  try {
    const stats = await Property.aggregate([
      {
        $facet: {
          // ----------- TOTALS -----------
          totalProperties: [{ $count: "count" }],
          verifiedProperties: [
            { $match: { isSurveyVerified: true } },
            { $count: "count" },
          ],
          emptyProperties: [
            { $match: { isEmptyProperty: true } },
            { $count: "count" },
          ],

          // ----------- PROPERTY TYPES -----------
          byPropertyType: [
            {
              $group: {
                _id: "$propertyType",
                count: { $sum: 1 },
              },
            },
          ],
          byConstructionType: [
            {
              $group: {
                _id: "$constructionType",
                count: { $sum: 1 },
              },
            },
          ],
          byGender: [
            {
              $group: {
                _id: "$gender",
                count: { $sum: 1 },
              },
            },
          ],
          byReligion: [
            {
              $group: {
                _id: "$religion",
                count: { $sum: 1 },
              },
            },
          ],
          byWard: [
            {
              $group: {
                _id: "$ward",
                count: { $sum: 1 },
              },
            },
          ],

          // ----------- FAMILY & UTILITIES -----------
          familyStats: [
            {
              $group: {
                _id: null,
                totalMale: { $sum: "$addFamilyMembers.male" },
                totalFemale: { $sum: "$addFamilyMembers.female" },
              },
            },
          ],
          utilitiesStats: [
            {
              $group: {
                _id: null,
                waterConnection: {
                  $sum: { $cond: ["$utilities.isWaterConnection", 1, 0] },
                },
                sewerConnection: {
                  $sum: { $cond: ["$utilities.isSewerConnection", 1, 0] },
                },
                submersiblePump: {
                  $sum: { $cond: ["$utilities.isSubmersiblePump", 1, 0] },
                },
                tenantAvailable: {
                  $sum: { $cond: ["$utilities.isTenantAvailable", 1, 0] },
                },
              },
            },
          ],

          // ----------- FLOOR & AREA -----------
          floorStats: [
            { $unwind: "$floorsData.floors" },
            {
              $group: {
                _id: "$floorsData.floors.classification",
                totalCarpetArea: {
                  $sum: {
                    $add: [
                      { $ifNull: ["$floorsData.floors.carpetAreaC", 0] },
                      { $ifNull: ["$floorsData.floors.carpetAreaR", 0] },
                    ],
                  },
                },
                totalEmptyArea: {
                  $sum: {
                    $add: [
                      { $ifNull: ["$floorsData.floors.emptyAreaC", 0] },
                      { $ifNull: ["$floorsData.floors.emptyAreaR", 0] },
                    ],
                  },
                },
                count: { $sum: 1 },
              },
            },
            {
              $addFields: {
                avgCarpetArea: {
                  $divide: ["$totalCarpetArea", "$count"],
                },
                avgEmptyArea: {
                  $divide: ["$totalEmptyArea", "$count"],
                },
              },
            },
          ],

          numberOfFloorsStats: [
            {
              $group: {
                _id: "$floorsData.numberOfFloors",
                count: { $sum: 1 },
              },
            },
          ],

          toiletsStats: [
            {
              $group: {
                _id: null,
                totalToilets: { $sum: "$numberOfToilets" },
                avgToilets: { $avg: "$numberOfToilets" },
              },
            },
          ],

          constructionYearStats: [
            {
              $group: {
                _id: null,
                minYear: { $min: "$constructionYear" },
                maxYear: { $max: "$constructionYear" },
                avgYear: { $avg: "$constructionYear" },
              },
            },
          ],

          // ----------- SURVEYOR PERFORMANCE -----------
          surveyorStats: [
            {
              $group: {
                _id: "$surveyor",
                totalSurveys: { $sum: 1 },
                verifiedSurveys: {
                  $sum: { $cond: ["$isSurveyVerified", 1, 0] },
                },
              },
            },
            // Lookup surveyor names
            {
              $lookup: {
                from: "surveyors",
                localField: "_id",
                foreignField: "_id",
                as: "surveyorInfo",
              },
            },
            {
              $unwind: { path: "$surveyorInfo", preserveNullAndEmptyArrays: true },
            },
            {
              $addFields: {
                surveyorName: "$surveyorInfo.name",
                verifiedPercentage: {
                  $cond: [
                    { $eq: ["$totalSurveys", 0] },
                    0,
                    { $multiply: [{ $divide: ["$verifiedSurveys", "$totalSurveys"] }, 100] },
                  ],
                },
              },
            },
            { $project: { surveyorInfo: 0 } },
          ],
        },
      },
      // ----------- CALCULATE PERCENTAGES -----------
      {
        $project: {
          totalProperties: { $arrayElemAt: ["$totalProperties.count", 0] },
          verifiedProperties: { $arrayElemAt: ["$verifiedProperties.count", 0] },
          emptyProperties: { $arrayElemAt: ["$emptyProperties.count", 0] },

          byPropertyType: {
            $map: {
              input: "$byPropertyType",
              as: "item",
              in: {
                _id: "$$item._id",
                count: "$$item.count",
                percentage: {
                  $multiply: [
                    { $divide: ["$$item.count", { $arrayElemAt: ["$totalProperties.count", 0] }] },
                    100,
                  ],
                },
              },
            },
          },

          byConstructionType: {
            $map: {
              input: "$byConstructionType",
              as: "item",
              in: {
                _id: "$$item._id",
                count: "$$item.count",
                percentage: {
                  $multiply: [
                    { $divide: ["$$item.count", { $arrayElemAt: ["$totalProperties.count", 0] }] },
                    100,
                  ],
                },
              },
            },
          },

          byGender: {
            $map: {
              input: "$byGender",
              as: "item",
              in: {
                _id: "$$item._id",
                count: "$$item.count",
                percentage: {
                  $multiply: [
                    { $divide: ["$$item.count", { $arrayElemAt: ["$totalProperties.count", 0] }] },
                    100,
                  ],
                },
              },
            },
          },

          byReligion: {
            $map: {
              input: "$byReligion",
              as: "item",
              in: {
                _id: "$$item._id",
                count: "$$item.count",
                percentage: {
                  $multiply: [
                    { $divide: ["$$item.count", { $arrayElemAt: ["$totalProperties.count", 0] }] },
                    100,
                  ],
                },
              },
            },
          },

          byWard: {
            $map: {
              input: "$byWard",
              as: "item",
              in: {
                _id: "$$item._id",
                count: "$$item.count",
                percentage: {
                  $multiply: [
                    { $divide: ["$$item.count", { $arrayElemAt: ["$totalProperties.count", 0] }] },
                    100,
                  ],
                },
              },
            },
          },

          familyStats: { $arrayElemAt: ["$familyStats", 0] },
          utilitiesStats: {
            $let: {
              vars: { u: { $arrayElemAt: ["$utilitiesStats", 0] } },
              in: {
                waterConnection: "$$u.waterConnection",
                waterConnectionPercentage: {
                  $multiply: [{ $divide: ["$$u.waterConnection", { $arrayElemAt: ["$totalProperties.count", 0] }] }, 100],
                },
                sewerConnection: "$$u.sewerConnection",
                sewerConnectionPercentage: {
                  $multiply: [{ $divide: ["$$u.sewerConnection", { $arrayElemAt: ["$totalProperties.count", 0] }] }, 100],
                },
                submersiblePump: "$$u.submersiblePump",
                submersiblePumpPercentage: {
                  $multiply: [{ $divide: ["$$u.submersiblePump", { $arrayElemAt: ["$totalProperties.count", 0] }] }, 100],
                },
                tenantAvailable: "$$u.tenantAvailable",
                tenantAvailablePercentage: {
                  $multiply: [{ $divide: ["$$u.tenantAvailable", { $arrayElemAt: ["$totalProperties.count", 0] }] }, 100],
                },
              },
            },
          },

          floorStats: 1,
          numberOfFloorsStats: 1,
          toiletsStats: { $arrayElemAt: ["$toiletsStats", 0] },
          constructionYearStats: { $arrayElemAt: ["$constructionYearStats", 0] },
          surveyorStats: 1,
        },
      },
    ]);

    return stats[0];
  } catch (err) {
    console.error("Error fetching property stats:", err);
    return null;
  }
};
