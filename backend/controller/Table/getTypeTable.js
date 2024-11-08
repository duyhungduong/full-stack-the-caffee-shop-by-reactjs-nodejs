const tableModel = require("../../models/tableModel");

const getTypeTable = async (req, res) => {
  try {
    const typeTable = await tableModel.distinct("tableType");

    console.log("tableType ", typeTable);

    const tableByType = [];

    for (const tableType of typeTable) {
      const table = await tableModel.findOne({tableType});

      if(table){
        tableByType.push(table);
      }
    }

    res.json({
      data: tableByType,
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

module.exports = getTypeTable;
