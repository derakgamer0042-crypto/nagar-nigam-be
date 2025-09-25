import pandas as pd
from pymongo import MongoClient
import json



FILE_PATH = "karahal_ward_8.xlsx"
mongo_uri = "mongodb+srv://peter:qJ4XwxeBuaknmEaf@cluster0.lt1zsxj.mongodb.net/"


floor = {
	"carpetAreaC" : None,
	"emptyAreaC" : None,
	"carpetAreaR" : None,
	"emptyAreaR" : None
}

schema = {
	"ward"  : None,
	"houseNumber" : None,
	"phoneNumber" : None,
	"fatherName" : None,
	"roadWidthType" : None,
	"constructionType" : None,
	"propertyType" : None,
	"propertyCategory" : None,
	"floorsData" : {
		"numberOfFloors" :  None,
		"floors" : [floor]
	},
	"createdAt" : None,
	"comment" : None,
}


def process_floors(row):
    floors = []

    commercialEmptyArea = row.get("Empty_Area_Commercial", 0)
    residentialEmptyArea = row.get("Residential_Empty_Area", 0)

    for floor_num in range(1, row["NUMBER OF FLOOR"] + 1):  # floors start at 1
        commercialCarpetArea = f"Commercial_Coppate_Area_Floor{floor_num}"
        residentialCarpetArea = f"Residential_Coppate_Area_Floor{floor_num}"

        floor = {
            "carpetAreaC": row.get(commercialCarpetArea, 0),
            "emptyAreaC": commercialEmptyArea if floor_num == 1 else 0,
            "carpetAreaR": row.get(residentialCarpetArea, 0),
            "emptyAreaR": residentialEmptyArea if floor_num == 1 else 0,
        }

        floors.append(floor)

    return floors


final_data = []

def process_each_row(row):
	row_dict = {}

	row_dict["ward"] = row["WARD NUMBER"]
	row_dict["houseNumber"] = row["HOUSE_NUMBER"]
	row_dict["phoneNumber"] = row["Phone number"]
	row_dict["fatherName"] = row["FATHER NAME"]
	row_dict["roadWidthType"] = row["RODE WITH TAPE- NAME"]
	row_dict["constructionType"] = row["CONSTRUCTION TYPE NAME"]
	row_dict["propertyType"] = row["PROPERTY TYPE NAME"]
	row_dict["propertyCategory"] = row["PROPERTY CATEGORY"]
	# row_dict["createdAt"] = row["Timestamp"]
	row_dict["comment"] = row["Comment"]
	row_dict["floorsData"] = {
		"numberOfFloors" : row["NUMBER OF FLOOR"],
		"floors" : process_floors(row)
	}

	final_data.append(row_dict)


def main():
	try:
		client = MongoClient(mongo_uri)
		db = client["nagar_nigam"]
		collection = db["properties"]

		df = pd.read_excel(FILE_PATH)

		for _,row in df.iterrows():
			process_each_row(row)

		with open("data.json" , "w") as f:
			json.dump(final_data , f , ensure_ascii=False ,  indent=2)
			print("JSON file write successfully")


		

	except Exception as e:
		print("❌ ❌ [ERROR] " , e)


main()