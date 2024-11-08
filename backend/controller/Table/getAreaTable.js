

const tableModel = require("../../models/tableModel");

const getAreaTable = async (req, res) => {
  try {
    const areaTable = await tableModel.distinct("tableArea");

    // console.log("tableArea ", areaTable);

    const areaByType = [];

    for (const tableArea of areaTable) {
      const table = await tableModel.findOne({tableArea});

      if(table){
        areaByType.push(table);
      }
    }

    res.json({
      data: areaByType,
      message: "Table by type",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getAreaTable