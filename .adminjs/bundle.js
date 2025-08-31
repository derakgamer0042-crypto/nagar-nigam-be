(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const floorTypes = [{
    value: "commercial",
    label: "Commercial"
  }, {
    value: "residential",
    label: "Residential"
  }, {
    value: "mixed",
    label: "Mixed"
  }];
  function FloorsComponent({
    onChange,
    property,
    record
  }) {
    console.log("inside the custom component : ", record.params);
    const initialValue = record.params[property.name] || {
      numberOfFloors: 0,
      floors: []
    };
    const [numFloors, setNumFloors] = React.useState(initialValue.numberOfFloors || 0);
    const [floors, setFloors] = React.useState(initialValue.floors || []);

    // Sync floors array length with numberOfFloors immediately when numFloors changes
    React.useEffect(() => {
      const newFloors = [];
      for (let i = 0; i < numFloors; i++) {
        newFloors.push(floors[i] || {
          classification: "residential",
          carpetAreaC: "",
          emptyAreaC: "",
          carpetAreaR: "",
          emptyAreaR: ""
        });
      }
      // Update floors state and notify AdminJS right here
      setFloors(newFloors);
      onChange("floorsData", {
        numberOfFloors: numFloors,
        floors: newFloors
      });
    }, [numFloors]);

    // When floor data changes, update state and notify AdminJS immediately
    const handleFloorChange = (index, field, value) => {
      const updatedFloors = [...floors];
      updatedFloors[index] = {
        ...updatedFloors[index],
        [field]: value
      };
      setFloors(updatedFloors);
      onChange("floorsData", {
        numberOfFloors: numFloors,
        floors: updatedFloors
      });
    };

    // When number of floors input changes, update and notify immediately
    const handleNumFloorsChange = e => {
      const newVal = Number(e.target.value);
      setNumFloors(newVal);
      // onChange is called in useEffect after numFloors state changes
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Number of Floors"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      min: 0,
      value: numFloors,
      onChange: handleNumFloorsChange,
      width: 100
    })), floors.map((floor, i) => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      key: i,
      variant: "grey",
      padding: "xl",
      marginBottom: "lg",
      borderRadius: "default"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      marginBottom: "default",
      fontWeight: "bold"
    }, "Floor ", i + 1), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Floor Type"), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      options: floorTypes,
      value: floorTypes.find(({
        value
      }) => value === floor.classification) || null,
      onChange: selected => handleFloorChange(i, "classification", selected?.value || "")
    })), floor.classification === "commercial" && /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Carpet Area (C)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      value: floor.carpetAreaC,
      onChange: e => handleFloorChange(i, "carpetAreaC", e.target.value)
    })), i == 0 && /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Empty Area (C)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      value: floor.emptyAreaC,
      onChange: e => handleFloorChange(i, "emptyAreaC", e.target.value)
    }))), floor.classification === "residential" && /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Carpet Area (R)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      value: floor.carpetAreaR,
      onChange: e => handleFloorChange(i, "carpetAreaR", e.target.value)
    })), i == 0 && /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Empty Area (R)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      value: floor.emptyAreaR,
      onChange: e => handleFloorChange(i, "emptyAreaR", e.target.value)
    }))), floor.classification === "mixed" && /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Carpet Area (C)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      value: floor.carpetAreaC,
      onChange: e => handleFloorChange(i, "carpetAreaC", e.target.value)
    })), i == 0 && /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Empty Area (C)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      value: floor.emptyAreaC,
      onChange: e => handleFloorChange(i, "emptyAreaC", e.target.value)
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Carpet Area (R)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      value: floor.carpetAreaR,
      onChange: e => handleFloorChange(i, "carpetAreaR", e.target.value)
    })), i == 0 && /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Empty Area (R)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      value: floor.emptyAreaR,
      onChange: e => handleFloorChange(i, "emptyAreaR", e.target.value)
    }))))));
  }

  const PropertyType = {
    other: "अन्य",
    otherEstablishment: "अन्य प्रतिष्ठान",
    semiGovernmentOffice: "अर्धसरकारी कार्यालय",
    residenceAndClinic: "आवास और क्लिनिक",
    residenceAndShop: "आवास और दुकान",
    residenceAndMedicalStore: "आवास और मेडिकल स्टोर",
    building: "इमारत",
    atm: "एटीएम",
    office: "ऑफिस",
    industrialUnits: "औद्योगिक इकाईयां",
    sportsCenter: "क्रीड़ा केंद्र",
    club: "क्लब",
    welfareHall: "कल्याण मंडप",
    clinic: "क्लिनिक",
    factory: "कारखाना",
    coachingCenter: "कोचिंग",
    coalDepot: "कोल् डिपो",
    garage: "गैराज",
    gasWarehouseAgency: "गैस गोदाम/एजेंसी",
    warehouse: "गोदाम",
    cinemaHall: "चल्चित्र गह",
    fourStarAndAboveHotels: "चार सितारा और उसके ऊपर के होटल",
    hospital: "चिकित्सालय‌",
    hostel: "छात्रावास",
    gym: "जिम",
    tvTower: "टी.वी टावर",
    tower: "टॉवर",
    diagnosticCenter: "डायग्नोस्टिक केंद्र",
    upToThreeStarHotels: "तीन स्टार तक के होटल",
    theater: "थिएटर",
    shop: "दुकान",
    telecomTower: "दूरसंचार टावर",
    nursingHome: "नर्सिंग होम",
    privateHotel: "निजी होटल",
    petrolPump: "पेट्रोल पंप",
    pubs: "पब्स",
    laboratories: "प्रयोगशालाएं",
    privateLimitedCompany: "प्रा. लिमिटेड कंपनी",
    library: "पुस्तकालय",
    polyclinic: "पालीक्लिनिक",
    flat: "फ्लैट",
    bank: "बैंक",
    banquetHall: "बैंक्वेट हॉल",
    multiStoreyBuilding: "बहु मंजिला इमारत",
    multiStoreyCommercialEstablishment: "बहु मंजिला व्यवसायिक प्रतिष्ठान",
    bar: "बार",
    plot: "भूखंड",
    medicalStore: "मेडिकल स्टोर",
    marriageHome: "मैरिज होम",
    multiplex: "मल्टीप्लेक्स",
    malls: "मॉल्स",
    residence: "वासगृह",
    marriageClub: "विवाह क्लब",
    liquorShopBeerBar: "शराब की दुकान / बियर बार",
    physicalHealthCenterEtc: "शारीरिक स्वास्थ्य केंद्र आदि",
    educationalInstitution: "शिक्षण संस्थान",
    governmentOffice: "सरकारी कार्यालय",
    governmentBuilding: "सरकारी भवन",
    governmentSchool: "सरकारी विद्यालय",
    healthCareCenter: "स्वस्थ परिचर्या केंद्र",
    hotel: "होटल",
    hotelBar: "होटल/बार",
    hotelRestaurant: "होटल/रेस्टोरेंट",
    hoarding: "होर्डिंग"
  };
  const ConstructionType = {
    permanentWithRccRbcRoof: "पक्का भवन / RCC या RBC छत सहित",
    permanentWithAsbestosFiberTinShed: "अन्य पक्का भवन, ऐसबेस्टस / फाइबर या टीन शेड",
    temporaryOrOtherBuilding: "कच्चा भवन या अन्य समस्त भवन",
    plot: "भूखंड"
  };
  const RoadWidthType = {
    lessThan9m: "9 मीटर से कम चौड़ी सड़क",
    from9to12m: "9 से 12 मीटर चौड़ी सड़क",
    from12to24m: "12 से 24 मीटर चौड़ी सड़क",
    moreThan24m: "24 मीटर से अधिक चौड़ी सड़क"
  };
  Object.fromEntries(Object.entries(PropertyType).map(([key, value]) => [value, key]));
  Object.fromEntries(Object.entries(ConstructionType).map(([key, value]) => [value, key]));
  Object.fromEntries(Object.entries(RoadWidthType).map(([key, value]) => [value, key]));

  const buildOject = (flattenObject, property) => {
    const obj = {};

    // console.log("property path is : " , property.path)

    Object.entries(flattenObject).map(([key, value]) => {
      if (key.startsWith(`${property.path}`)) obj[key.split(".")[1]] = value;
    });

    // console.log("object is : " , obj)

    return obj;
  };

  const RateModelEdit = props => {
    const {
      record,
      onChange,
      property
    } = props;
    console.log("property : ", property.path);
    console.log("record : ", record);

    // here I am recieving the custom path that I am passing from my admin js , where I am calling this component inside the propert tab
    property.path;
    // console.log("💁 path is : " , path)

    // here we are creating a valid js object , because adminjs flatten the nested object
    const value = buildOject(record.params, property);
    // console.log("🚀 value is : " , value)

    // Handle change for nested field
    const handleChange = (key, newValue) => {
      console.log("tried calling handle change function .......");
      onChange && onChange(`${property.path}.${key}`, newValue);
    };
    return /*#__PURE__*/React__default.default.createElement("div", {
      style: styles.container
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      style: styles.header
    }, RoadWidthType[property.path]), /*#__PURE__*/React__default.default.createElement("div", {
      style: styles.fieldsContainer
    }, Object.entries(ConstructionType).map(([key, label]) => /*#__PURE__*/React__default.default.createElement("div", {
      key: key,
      style: styles.field
    }, /*#__PURE__*/React__default.default.createElement("label", {
      style: styles.label
    }, label, " ka ", /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        fontWeight: "bold"
      }
    }, "\u0926\u0930"), " "), /*#__PURE__*/React__default.default.createElement("input", {
      type: "text",
      value: value[key] || "",
      placeholder: `Enter ${label} ka rate`,
      onChange: e => handleChange(key, e.target.value),
      style: styles.input
    })))));
  };

  // Inline styles (you can replace with CSS or styled-components)
  const styles = {
    container: {
      padding: "16px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      border: "1px solid #ddd",
      marginBottom: "16px"
    },
    header: {
      fontSize: "18px",
      marginBottom: "12px",
      color: "#333"
    },
    fieldsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    },
    field: {
      display: "flex",
      flexDirection: "column"
    },
    label: {
      marginBottom: "4px",
      fontWeight: "500",
      color: "#555"
    },
    input: {
      padding: "8px 12px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px"
    }
  };

  const GetLocation = props => {
    const {
      record,
      onChange,
      property
    } = props;
    console.log("inside the location's custom component");
    console.log("record : ", record);
    console.log("property : ", property);

    // extract nested location values
    const latitude = record?.params["location.latitude"] || "";
    const longitude = record?.params["location.longitude"] || "";
    const handleGetLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // update AdminJS form values
          onChange("location.latitude", lat);
          onChange("location.longitude", lon);
        }, error => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please allow location access.");
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        margin: "25px 0px"
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      gap: "10px"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      width: 1 / 2,
      placeholder: "Latitude",
      value: latitude,
      onChange: e => onChange("location.latitude", e.target.value)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      width: 1 / 2,
      placeholder: "Longitude",
      value: longitude,
      onChange: e => onChange("location.longitude", e.target.value)
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      marginTop: "10px"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "button",
      onClick: handleGetLocation
    }, "Get Location")));
  };

  const Edit = ({ property, record, onChange }) => {
      const { translateProperty } = adminjs.useTranslation();
      const { params } = record;
      const { custom } = property;
      const path = adminjs.flat.get(params, custom.filePathProperty);
      const key = adminjs.flat.get(params, custom.keyProperty);
      const file = adminjs.flat.get(params, custom.fileProperty);
      const [originalKey, setOriginalKey] = React.useState(key);
      const [filesToUpload, setFilesToUpload] = React.useState([]);
      React.useEffect(() => {
          // it means means that someone hit save and new file has been uploaded
          // in this case fliesToUpload should be cleared.
          // This happens when user turns off redirect after new/edit
          if ((typeof key === 'string' && key !== originalKey)
              || (typeof key !== 'string' && !originalKey)
              || (typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length)) {
              setOriginalKey(key);
              setFilesToUpload([]);
          }
      }, [key, originalKey]);
      const onUpload = (files) => {
          setFilesToUpload(files);
          onChange(custom.fileProperty, files);
      };
      const handleRemove = () => {
          onChange(custom.fileProperty, null);
      };
      const handleMultiRemove = (singleKey) => {
          const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
          const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
          if (path && path.length > 0) {
              const newPath = path.map((currentPath, i) => (i !== index ? currentPath : null));
              let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
              newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
              onChange({
                  ...record,
                  params: newParams,
              });
          }
          else {
              // eslint-disable-next-line no-console
              console.log('You cannot remove file when there are no uploaded files yet');
          }
      };
      return (React__default.default.createElement(designSystem.FormGroup, null,
          React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
          React__default.default.createElement(designSystem.DropZone, { onChange: onUpload, multiple: custom.multiple, validate: {
                  mimeTypes: custom.mimeTypes,
                  maxSize: custom.maxSize,
              }, files: filesToUpload }),
          !custom.multiple && key && path && !filesToUpload.length && file !== null && (React__default.default.createElement(designSystem.DropZoneItem, { filename: key, src: path, onRemove: handleRemove })),
          custom.multiple && key && key.length && path ? (React__default.default.createElement(React__default.default.Fragment, null, key.map((singleKey, index) => {
              // when we remove items we set only path index to nulls.
              // key is still there. This is because
              // we have to maintain all the indexes. So here we simply filter out elements which
              // were removed and display only what was left
              const currentPath = path[index];
              return currentPath ? (React__default.default.createElement(designSystem.DropZoneItem, { key: singleKey, filename: singleKey, src: path[index], onRemove: () => handleMultiRemove(singleKey) })) : '';
          }))) : ''));
  };

  const AudioMimeTypes = [
      'audio/aac',
      'audio/midi',
      'audio/x-midi',
      'audio/mpeg',
      'audio/ogg',
      'application/ogg',
      'audio/opus',
      'audio/wav',
      'audio/webm',
      'audio/3gpp2',
  ];
  const ImageMimeTypes = [
      'image/bmp',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/vnd.microsoft.icon',
      'image/tiff',
      'image/webp',
  ];

  // eslint-disable-next-line import/no-extraneous-dependencies
  const SingleFile = (props) => {
      const { name, path, mimeType, width } = props;
      if (path && path.length) {
          if (mimeType && ImageMimeTypes.includes(mimeType)) {
              return (React__default.default.createElement("img", { src: path, style: { maxHeight: width, maxWidth: width }, alt: name }));
          }
          if (mimeType && AudioMimeTypes.includes(mimeType)) {
              return (React__default.default.createElement("audio", { controls: true, src: path },
                  "Your browser does not support the",
                  React__default.default.createElement("code", null, "audio"),
                  React__default.default.createElement("track", { kind: "captions" })));
          }
      }
      return (React__default.default.createElement(designSystem.Box, null,
          React__default.default.createElement(designSystem.Button, { as: "a", href: path, ml: "default", size: "sm", rounded: true, target: "_blank" },
              React__default.default.createElement(designSystem.Icon, { icon: "DocumentDownload", color: "white", mr: "default" }),
              name)));
  };
  const File = ({ width, record, property }) => {
      const { custom } = property;
      let path = adminjs.flat.get(record?.params, custom.filePathProperty);
      if (!path) {
          return null;
      }
      const name = adminjs.flat.get(record?.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
      const mimeType = custom.mimeTypeProperty
          && adminjs.flat.get(record?.params, custom.mimeTypeProperty);
      if (!property.custom.multiple) {
          if (custom.opts && custom.opts.baseUrl) {
              path = `${custom.opts.baseUrl}/${name}`;
          }
          return (React__default.default.createElement(SingleFile, { path: path, name: name, width: width, mimeType: mimeType }));
      }
      if (custom.opts && custom.opts.baseUrl) {
          const baseUrl = custom.opts.baseUrl || '';
          path = path.map((singlePath, index) => `${baseUrl}/${name[index]}`);
      }
      return (React__default.default.createElement(React__default.default.Fragment, null, path.map((singlePath, index) => (React__default.default.createElement(SingleFile, { key: singlePath, path: singlePath, name: name[index], width: width, mimeType: mimeType[index] })))));
  };

  const List = (props) => (React__default.default.createElement(File, { width: 100, ...props }));

  const Show = (props) => {
      const { property } = props;
      const { translateProperty } = adminjs.useTranslation();
      return (React__default.default.createElement(designSystem.FormGroup, null,
          React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
          React__default.default.createElement(File, { width: "100%", ...props })));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.FloorEdit = FloorsComponent;
  AdminJS.UserComponents.RateModelEdit = RateModelEdit;
  AdminJS.UserComponents.GetLocation = GetLocation;
  AdminJS.UserComponents.UploadEditComponent = Edit;
  AdminJS.UserComponents.UploadListComponent = List;
  AdminJS.UserComponents.UploadShowComponent = Show;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9hZG1pbi9jb21wb25lbnRzL0Zsb29yRWRpdC5qc3giLCIuLi91dGlscy9kYXRhLmpzIiwiLi4vYWRtaW4vYWRtaW5VdGlscy9hZG1pblV0aWxzLmpzIiwiLi4vYWRtaW4vY29tcG9uZW50cy9SYXRlTW9kZWxFZGl0LmpzeCIsIi4uL2FkbWluL2NvbXBvbmVudHMvR2V0TG9jYXRpb24uanN4IiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL3R5cGVzL21pbWUtdHlwZXMudHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkU2hvd0NvbXBvbmVudC5qcyIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBCb3gsIExhYmVsLCBTZWxlY3QsIElucHV0LCBGb3JtR3JvdXAgfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xuXG5jb25zdCBmbG9vclR5cGVzID0gW1xuICB7IHZhbHVlOiBcImNvbW1lcmNpYWxcIiwgbGFiZWw6IFwiQ29tbWVyY2lhbFwiIH0sXG4gIHsgdmFsdWU6IFwicmVzaWRlbnRpYWxcIiwgbGFiZWw6IFwiUmVzaWRlbnRpYWxcIiB9LFxuICB7IHZhbHVlOiBcIm1peGVkXCIsIGxhYmVsOiBcIk1peGVkXCIgfSxcbl07XG5cbmZ1bmN0aW9uIEZsb29yc0NvbXBvbmVudCh7IG9uQ2hhbmdlLCBwcm9wZXJ0eSwgcmVjb3JkIH0pIHtcblxuICBjb25zb2xlLmxvZyhcImluc2lkZSB0aGUgY3VzdG9tIGNvbXBvbmVudCA6IFwiICwgcmVjb3JkLnBhcmFtcylcblxuICBjb25zdCBpbml0aWFsVmFsdWUgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdIHx8IHtcbiAgICBudW1iZXJPZkZsb29yczogMCxcbiAgICBmbG9vcnM6IFtdLFxuICB9O1xuXG5cbiAgY29uc3QgW251bUZsb29ycywgc2V0TnVtRmxvb3JzXSA9IHVzZVN0YXRlKGluaXRpYWxWYWx1ZS5udW1iZXJPZkZsb29ycyB8fCAwKTtcbiAgY29uc3QgW2Zsb29ycywgc2V0Rmxvb3JzXSA9IHVzZVN0YXRlKGluaXRpYWxWYWx1ZS5mbG9vcnMgfHwgW10pO1xuXG4gIC8vIFN5bmMgZmxvb3JzIGFycmF5IGxlbmd0aCB3aXRoIG51bWJlck9mRmxvb3JzIGltbWVkaWF0ZWx5IHdoZW4gbnVtRmxvb3JzIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBuZXdGbG9vcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUZsb29yczsgaSsrKSB7XG4gICAgICBuZXdGbG9vcnMucHVzaChcbiAgICAgICAgZmxvb3JzW2ldIHx8IHtcbiAgICAgICAgICBjbGFzc2lmaWNhdGlvbjogXCJyZXNpZGVudGlhbFwiLFxuICAgICAgICAgIGNhcnBldEFyZWFDOiBcIlwiLFxuICAgICAgICAgIGVtcHR5QXJlYUM6IFwiXCIsXG4gICAgICAgICAgY2FycGV0QXJlYVI6IFwiXCIsXG4gICAgICAgICAgZW1wdHlBcmVhUjogXCJcIixcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gVXBkYXRlIGZsb29ycyBzdGF0ZSBhbmQgbm90aWZ5IEFkbWluSlMgcmlnaHQgaGVyZVxuICAgIHNldEZsb29ycyhuZXdGbG9vcnMpO1xuICAgIG9uQ2hhbmdlKFwiZmxvb3JzRGF0YVwiLCB7IG51bWJlck9mRmxvb3JzOiBudW1GbG9vcnMsIGZsb29yczogbmV3Rmxvb3JzIH0pO1xuICB9LCBbbnVtRmxvb3JzXSk7XG5cbiAgLy8gV2hlbiBmbG9vciBkYXRhIGNoYW5nZXMsIHVwZGF0ZSBzdGF0ZSBhbmQgbm90aWZ5IEFkbWluSlMgaW1tZWRpYXRlbHlcbiAgY29uc3QgaGFuZGxlRmxvb3JDaGFuZ2UgPSAoaW5kZXgsIGZpZWxkLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZWRGbG9vcnMgPSBbLi4uZmxvb3JzXTtcbiAgICB1cGRhdGVkRmxvb3JzW2luZGV4XSA9IHtcbiAgICAgIC4uLnVwZGF0ZWRGbG9vcnNbaW5kZXhdLFxuICAgICAgW2ZpZWxkXTogdmFsdWUsXG4gICAgfTtcbiAgICBzZXRGbG9vcnModXBkYXRlZEZsb29ycyk7XG4gICAgY29uc3QgdXBkYXRlZFZhbHVlID0geyBudW1iZXJPZkZsb29yczogbnVtRmxvb3JzLCBmbG9vcnM6IHVwZGF0ZWRGbG9vcnMgfVxuICAgIG9uQ2hhbmdlKFwiZmxvb3JzRGF0YVwiLCB7IG51bWJlck9mRmxvb3JzOiBudW1GbG9vcnMsIGZsb29yczogdXBkYXRlZEZsb29ycyB9KTtcbiAgfTtcblxuXG4gIC8vIFdoZW4gbnVtYmVyIG9mIGZsb29ycyBpbnB1dCBjaGFuZ2VzLCB1cGRhdGUgYW5kIG5vdGlmeSBpbW1lZGlhdGVseVxuICBjb25zdCBoYW5kbGVOdW1GbG9vcnNDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIGNvbnN0IG5ld1ZhbCA9IE51bWJlcihlLnRhcmdldC52YWx1ZSk7XG4gICAgc2V0TnVtRmxvb3JzKG5ld1ZhbCk7XG4gICAgLy8gb25DaGFuZ2UgaXMgY2FsbGVkIGluIHVzZUVmZmVjdCBhZnRlciBudW1GbG9vcnMgc3RhdGUgY2hhbmdlc1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEJveD5cbiAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgIDxMYWJlbD5OdW1iZXIgb2YgRmxvb3JzPC9MYWJlbD5cbiAgICAgICAgPElucHV0XG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgbWluPXswfVxuICAgICAgICAgIHZhbHVlPXtudW1GbG9vcnN9XG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZU51bUZsb29yc0NoYW5nZX1cbiAgICAgICAgICB3aWR0aD17MTAwfVxuICAgICAgICAvPlxuICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgIHtmbG9vcnMubWFwKChmbG9vciwgaSkgPT4gKFxuICAgICAgICA8Qm94XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHZhcmlhbnQ9XCJncmV5XCJcbiAgICAgICAgICBwYWRkaW5nPVwieGxcIlxuICAgICAgICAgIG1hcmdpbkJvdHRvbT1cImxnXCJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxMYWJlbCBtYXJnaW5Cb3R0b209XCJkZWZhdWx0XCIgZm9udFdlaWdodD1cImJvbGRcIj5cbiAgICAgICAgICAgIEZsb29yIHtpICsgMX1cbiAgICAgICAgICA8L0xhYmVsPlxuXG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIDxMYWJlbD5GbG9vciBUeXBlPC9MYWJlbD5cbiAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgb3B0aW9ucz17Zmxvb3JUeXBlc31cbiAgICAgICAgICAgICAgdmFsdWU9e2Zsb29yVHlwZXMuZmluZCgoeyB2YWx1ZSB9KSA9PiB2YWx1ZSA9PT0gZmxvb3IuY2xhc3NpZmljYXRpb24pIHx8IG51bGx9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoc2VsZWN0ZWQpID0+XG4gICAgICAgICAgICAgICAgaGFuZGxlRmxvb3JDaGFuZ2UoaSwgXCJjbGFzc2lmaWNhdGlvblwiLCBzZWxlY3RlZD8udmFsdWUgfHwgXCJcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgIHtmbG9vci5jbGFzc2lmaWNhdGlvbiA9PT0gXCJjb21tZXJjaWFsXCIgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICA8TGFiZWw+Q2FycGV0IEFyZWEgKEMpPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zsb29yLmNhcnBldEFyZWFDfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVGbG9vckNoYW5nZShpLCBcImNhcnBldEFyZWFDXCIsIGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgICB7KGk9PTApICYmIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPkVtcHR5IEFyZWEgKEMpPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zsb29yLmVtcHR5QXJlYUN9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUZsb29yQ2hhbmdlKGksIFwiZW1wdHlBcmVhQ1wiLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD59XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2Zsb29yLmNsYXNzaWZpY2F0aW9uID09PSBcInJlc2lkZW50aWFsXCIgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICA8TGFiZWw+Q2FycGV0IEFyZWEgKFIpPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zsb29yLmNhcnBldEFyZWFSfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVGbG9vckNoYW5nZShpLCBcImNhcnBldEFyZWFSXCIsIGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgIHsoaT09MCkgJiYgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPkVtcHR5IEFyZWEgKFIpPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zsb29yLmVtcHR5QXJlYVJ9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUZsb29yQ2hhbmdlKGksIFwiZW1wdHlBcmVhUlwiLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD59XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2Zsb29yLmNsYXNzaWZpY2F0aW9uID09PSBcIm1peGVkXCIgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICA8TGFiZWw+Q2FycGV0IEFyZWEgKEMpPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zsb29yLmNhcnBldEFyZWFDfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVGbG9vckNoYW5nZShpLCBcImNhcnBldEFyZWFDXCIsIGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgICAgICAgIHsoaT09MCkgJiYgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICA8TGFiZWw+RW1wdHkgQXJlYSAoQyk8L0xhYmVsPlxuICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Zmxvb3IuZW1wdHlBcmVhQ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRmxvb3JDaGFuZ2UoaSwgXCJlbXB0eUFyZWFDXCIsIGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPn1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPkNhcnBldCBBcmVhIChSKTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtmbG9vci5jYXJwZXRBcmVhUn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRmxvb3JDaGFuZ2UoaSwgXCJjYXJwZXRBcmVhUlwiLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICB7KGk9PTApICYmIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPkVtcHR5IEFyZWEgKFIpPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zsb29yLmVtcHR5QXJlYVJ9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUZsb29yQ2hhbmdlKGksIFwiZW1wdHlBcmVhUlwiLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD59XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICApKX1cbiAgICA8L0JveD5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmxvb3JzQ29tcG9uZW50O1xuIiwiY29uc3QgUHJvcGVydHlUeXBlID0ge1xuICBvdGhlcjogXCLgpIXgpKjgpY3gpK9cIixcbiAgb3RoZXJFc3RhYmxpc2htZW50OiBcIuCkheCkqOCljeCkryDgpKrgpY3gpLDgpKTgpL/gpLfgpY3gpKDgpL7gpKhcIixcbiAgc2VtaUdvdmVybm1lbnRPZmZpY2U6IFwi4KSF4KSw4KWN4KSn4KS44KSw4KSV4KS+4KSw4KWAIOCkleCkvuCksOCljeCkr+CkvuCksuCkr1wiLFxuICByZXNpZGVuY2VBbmRDbGluaWM6IFwi4KSG4KS14KS+4KS4IOCklOCksCDgpJXgpY3gpLLgpL/gpKjgpL/gpJVcIixcbiAgcmVzaWRlbmNlQW5kU2hvcDogXCLgpIbgpLXgpL7gpLgg4KSU4KSwIOCkpuClgeCkleCkvuCkqFwiLFxuICByZXNpZGVuY2VBbmRNZWRpY2FsU3RvcmU6IFwi4KSG4KS14KS+4KS4IOCklOCksCDgpK7gpYfgpKHgpL/gpJXgpLIg4KS44KWN4KSf4KWL4KSwXCIsXG4gIGJ1aWxkaW5nOiBcIuCkh+CkruCkvuCksOCkpFwiLFxuICBhdG06IFwi4KSP4KSf4KWA4KSP4KSuXCIsXG4gIG9mZmljZTogXCLgpJHgpKvgpL/gpLhcIixcbiAgaW5kdXN0cmlhbFVuaXRzOiBcIuCklOCkpuCljeCkr+Cli+Ckl+Ckv+CklSDgpIfgpJXgpL7gpIjgpK/gpL7gpIJcIixcbiAgc3BvcnRzQ2VudGVyOiBcIuCkleCljeCksOClgOClnOCkviDgpJXgpYfgpILgpKbgpY3gpLBcIixcbiAgY2x1YjogXCLgpJXgpY3gpLLgpKxcIixcbiAgd2VsZmFyZUhhbGw6IFwi4KSV4KSy4KWN4KSv4KS+4KSjIOCkruCkguCkoeCkqlwiLFxuICBjbGluaWM6IFwi4KSV4KWN4KSy4KS/4KSo4KS/4KSVXCIsXG4gIGZhY3Rvcnk6IFwi4KSV4KS+4KSw4KSW4KS+4KSo4KS+XCIsXG4gIGNvYWNoaW5nQ2VudGVyOiBcIuCkleCli+CkmuCkv+CkguCkl1wiLFxuICBjb2FsRGVwb3Q6IFwi4KSV4KWL4KSy4KWNIOCkoeCkv+CkquCli1wiLFxuICBnYXJhZ2U6IFwi4KSX4KWI4KSw4KS+4KScXCIsXG4gIGdhc1dhcmVob3VzZUFnZW5jeTogXCLgpJfgpYjgpLgg4KSX4KWL4KSm4KS+4KSuL+Ckj+CknOClh+CkguCkuOClgFwiLFxuICB3YXJlaG91c2U6IFwi4KSX4KWL4KSm4KS+4KSuXCIsXG4gIGNpbmVtYUhhbGw6IFwi4KSa4KSy4KWN4KSa4KS/4KSk4KWN4KSwIOCkl+CkuVwiLFxuICBmb3VyU3RhckFuZEFib3ZlSG90ZWxzOiBcIuCkmuCkvuCksCDgpLjgpL/gpKTgpL7gpLDgpL4g4KSU4KSwIOCkieCkuOCkleClhyDgpIrgpKrgpLAg4KSV4KWHIOCkueCli+Ckn+CkslwiLFxuICBob3NwaXRhbDogXCLgpJrgpL/gpJXgpL/gpKTgpY3gpLjgpL7gpLLgpK/igIxcIixcbiAgaG9zdGVsOiBcIuCkm+CkvuCkpOCljeCksOCkvuCkteCkvuCkuFwiLFxuICBneW06IFwi4KSc4KS/4KSuXCIsXG4gIHR2VG93ZXI6IFwi4KSf4KWALuCkteClgCDgpJ/gpL7gpLXgpLBcIixcbiAgdG93ZXI6IFwi4KSf4KWJ4KS14KSwXCIsXG4gIGRpYWdub3N0aWNDZW50ZXI6IFwi4KSh4KS+4KSv4KSX4KWN4KSo4KWL4KS44KWN4KSf4KS/4KSVIOCkleClh+CkguCkpuCljeCksFwiLFxuICB1cFRvVGhyZWVTdGFySG90ZWxzOiBcIuCkpOClgOCkqCDgpLjgpY3gpJ/gpL7gpLAg4KSk4KSVIOCkleClhyDgpLngpYvgpJ/gpLJcIixcbiAgdGhlYXRlcjogXCLgpKXgpL/gpI/gpJ/gpLBcIixcbiAgc2hvcDogXCLgpKbgpYHgpJXgpL7gpKhcIixcbiAgdGVsZWNvbVRvd2VyOiBcIuCkpuClguCksOCkuOCkguCkmuCkvuCksCDgpJ/gpL7gpLXgpLBcIixcbiAgbnVyc2luZ0hvbWU6IFwi4KSo4KSw4KWN4KS44KS/4KSC4KSXIOCkueCli+CkrlwiLFxuICBwcml2YXRlSG90ZWw6IFwi4KSo4KS/4KSc4KWAIOCkueCli+Ckn+CkslwiLFxuICBwZXRyb2xQdW1wOiBcIuCkquClh+Ckn+CljeCksOCli+CksiDgpKrgpILgpKpcIixcbiAgcHViczogXCLgpKrgpKzgpY3gpLhcIixcbiAgbGFib3JhdG9yaWVzOiBcIuCkquCljeCksOCkr+Cli+Ckl+CktuCkvuCksuCkvuCkj+CkglwiLFxuICBwcml2YXRlTGltaXRlZENvbXBhbnk6IFwi4KSq4KWN4KSw4KS+LiDgpLLgpL/gpK7gpL/gpJ/gpYfgpKEg4KSV4KSC4KSq4KSo4KWAXCIsXG4gIGxpYnJhcnk6IFwi4KSq4KWB4KS44KWN4KSk4KSV4KS+4KSy4KSvXCIsXG4gIHBvbHljbGluaWM6IFwi4KSq4KS+4KSy4KWA4KSV4KWN4KSy4KS/4KSo4KS/4KSVXCIsXG4gIGZsYXQ6IFwi4KSr4KWN4KSy4KWI4KSfXCIsXG4gIGJhbms6IFwi4KSs4KWI4KSC4KSVXCIsXG4gIGJhbnF1ZXRIYWxsOiBcIuCkrOCliOCkguCkleCljeCkteClh+CknyDgpLngpYngpLJcIixcbiAgbXVsdGlTdG9yZXlCdWlsZGluZzogXCLgpKzgpLngpYEg4KSu4KSC4KSc4KS/4KSy4KS+IOCkh+CkruCkvuCksOCkpFwiLFxuICBtdWx0aVN0b3JleUNvbW1lcmNpYWxFc3RhYmxpc2htZW50OiBcIuCkrOCkueClgSDgpK7gpILgpJzgpL/gpLLgpL4g4KS14KWN4KSv4KS14KS44KS+4KSv4KS/4KSVIOCkquCljeCksOCkpOCkv+Ckt+CljeCkoOCkvuCkqFwiLFxuICBiYXI6IFwi4KSs4KS+4KSwXCIsXG4gIHBsb3Q6IFwi4KSt4KWC4KSW4KSC4KShXCIsXG4gIG1lZGljYWxTdG9yZTogXCLgpK7gpYfgpKHgpL/gpJXgpLIg4KS44KWN4KSf4KWL4KSwXCIsXG4gIG1hcnJpYWdlSG9tZTogXCLgpK7gpYjgpLDgpL/gpJwg4KS54KWL4KSuXCIsXG4gIG11bHRpcGxleDogXCLgpK7gpLLgpY3gpJ/gpYDgpKrgpY3gpLLgpYfgpJXgpY3gpLhcIixcbiAgbWFsbHM6IFwi4KSu4KWJ4KSy4KWN4KS4XCIsXG4gIHJlc2lkZW5jZTogXCLgpLXgpL7gpLjgpJfgpYPgpLlcIixcbiAgbWFycmlhZ2VDbHViOiBcIuCkteCkv+CkteCkvuCkuSDgpJXgpY3gpLLgpKxcIixcbiAgbGlxdW9yU2hvcEJlZXJCYXI6IFwi4KS24KSw4KS+4KSsIOCkleClgCDgpKbgpYHgpJXgpL7gpKggLyDgpKzgpL/gpK/gpLAg4KSs4KS+4KSwXCIsXG4gIHBoeXNpY2FsSGVhbHRoQ2VudGVyRXRjOiBcIuCktuCkvuCksOClgOCksOCkv+CklSDgpLjgpY3gpLXgpL7gpLjgpY3gpKXgpY3gpK8g4KSV4KWH4KSC4KSm4KWN4KSwIOCkhuCkpuCkv1wiLFxuICBlZHVjYXRpb25hbEluc3RpdHV0aW9uOiBcIuCktuCkv+CkleCljeCkt+CkoyDgpLjgpILgpLjgpY3gpKXgpL7gpKhcIixcbiAgZ292ZXJubWVudE9mZmljZTogXCLgpLjgpLDgpJXgpL7gpLDgpYAg4KSV4KS+4KSw4KWN4KSv4KS+4KSy4KSvXCIsXG4gIGdvdmVybm1lbnRCdWlsZGluZzogXCLgpLjgpLDgpJXgpL7gpLDgpYAg4KSt4KS14KSoXCIsXG4gIGdvdmVybm1lbnRTY2hvb2w6IFwi4KS44KSw4KSV4KS+4KSw4KWAIOCkteCkv+CkpuCljeCkr+CkvuCksuCkr1wiLFxuICBoZWFsdGhDYXJlQ2VudGVyOiBcIuCkuOCljeCkteCkuOCljeCkpSDgpKrgpLDgpL/gpJrgpLDgpY3gpK/gpL4g4KSV4KWH4KSC4KSm4KWN4KSwXCIsXG4gIGhvdGVsOiBcIuCkueCli+Ckn+CkslwiLFxuICBob3RlbEJhcjogXCLgpLngpYvgpJ/gpLIv4KSs4KS+4KSwXCIsXG4gIGhvdGVsUmVzdGF1cmFudDogXCLgpLngpYvgpJ/gpLIv4KSw4KWH4KS44KWN4KSf4KWL4KSw4KWH4KSC4KSfXCIsXG4gIGhvYXJkaW5nOiBcIuCkueCli+CksOCljeCkoeCkv+CkguCkl1wiXG59O1xuXG5cbi8vIE11bHRpcGxpZXIgPSB7XG4vLyAgICBjYXRlZ29yeTE6IHtcbi8vICAgICBob3N0ZWw6IFwi4KSb4KS+4KSk4KWN4KSw4KS+4KS14KS+4KS4XCIsXG4vLyAgICAgZWR1Y2F0aW9uYWxJbnN0aXR1dGlvbjogXCLgpLbgpL/gpJXgpY3gpLfgpKMg4KS44KSC4KS44KWN4KSl4KS+4KSoXCIsXG4vLyAgICAgc3BvcnRzQ2VudGVyOiBcIuCkleCljeCksOClgOClnOCkviDgpJXgpYfgpILgpKbgpY3gpLBcIixcbi8vICAgICBneW06IFwi4KSc4KS/4KSuXCIsXG4vLyAgICAgcGh5c2ljYWxIZWFsdGhDZW50ZXJFdGM6IFwi4KS24KS+4KSw4KWA4KSw4KS/4KSVIOCkuOCljeCkteCkvuCkuOCljeCkpeCljeCkryDgpJXgpYfgpILgpKbgpY3gpLAg4KSG4KSm4KS/XCIsXG4vLyAgICAgdGhlYXRlcjogXCLgpKXgpL/gpI/gpJ/gpLBcIixcbi8vICAgICBpbmR1c3RyaWFsVW5pdHM6IFwi4KSU4KSm4KWN4KSv4KWL4KSX4KS/4KSVIOCkh+CkleCkvuCkiOCkr+CkvuCkglwiLFxuLy8gICAgIGNpbmVtYUhhbGw6IFwi4KSa4KSy4KWN4KSa4KS/4KSk4KWN4KSwIOCkl+CkuVwiLFxuLy8gICAgIHNob3A6IFwi4KSm4KWB4KSV4KS+4KSoXCIsXG4vLyAgICAgbWVkaWNhbFN0b3JlOiBcIuCkruClh+CkoeCkv+CkleCksiDgpLjgpY3gpJ/gpYvgpLBcIlxuLy8gICAgIC8vIGJhcmJlciAmIHRhaWxvcmluZyBhcmUgbWVudGlvbmVkIGluIHNjaGVkdWxlIGJ1dCBub3QgcHJlc2VudCBpbiB5b3VyIG9yaWdpbmFsIGxpc3Rcbi8vICAgfSxcbi8vICAgY2F0ZWdvcnkyOiB7XG4vLyAgICAgbWVkaWNhbFN0b3JlOiBcIuCkruClh+CkoeCkv+CkleCksiDgpLjgpY3gpJ/gpYvgpLBcIixcbi8vICAgICBzaG9wOiBcIuCkpuClgeCkleCkvuCkqFwiLFxuLy8gICAgIG11bHRpU3RvcmV5Q29tbWVyY2lhbEVzdGFibGlzaG1lbnQ6IFwi4KSs4KS54KWBIOCkruCkguCknOCkv+CksuCkviDgpLXgpY3gpK/gpLXgpLjgpL7gpK/gpL/gpJUg4KSq4KWN4KSw4KSk4KS/4KS34KWN4KSg4KS+4KSoXCIsXG4vLyAgICAgY29hY2hpbmdDZW50ZXI6IFwi4KSV4KWL4KSa4KS/4KSC4KSXXCJcbi8vICAgfSxcbi8vICAgY2F0ZWdvcnkzOiB7XG4vLyAgICAgZ292ZXJubWVudE9mZmljZTogXCLgpLjgpLDgpJXgpL7gpLDgpYAg4KSV4KS+4KSw4KWN4KSv4KS+4KSy4KSvXCIsXG4vLyAgICAgc2VtaUdvdmVybm1lbnRPZmZpY2U6IFwi4KSF4KSw4KWN4KSn4KS44KSw4KSV4KS+4KSw4KWAIOCkleCkvuCksOCljeCkr+CkvuCksuCkr1wiLFxuLy8gICAgIG9mZmljZTogXCLgpJHgpKvgpL/gpLhcIixcbi8vICAgICBnb3Zlcm5tZW50QnVpbGRpbmc6IFwi4KS44KSw4KSV4KS+4KSw4KWAIOCkreCkteCkqFwiLFxuLy8gICAgIGNsaW5pYzogXCLgpJXgpY3gpLLgpL/gpKjgpL/gpJVcIixcbi8vICAgICBwb2x5Y2xpbmljOiBcIuCkquCkvuCksuClgOCkleCljeCksuCkv+CkqOCkv+CklVwiLFxuLy8gICAgIGRpYWdub3N0aWNDZW50ZXI6IFwi4KSh4KS+4KSv4KSX4KWN4KSo4KWL4KS44KWN4KSf4KS/4KSVIOCkleClh+CkguCkpuCljeCksFwiLFxuLy8gICAgIG51cnNpbmdIb21lOiBcIuCkqOCksOCljeCkuOCkv+CkguCklyDgpLngpYvgpK5cIixcbi8vICAgICBob3NwaXRhbDogXCLgpJrgpL/gpJXgpL/gpKTgpY3gpLjgpL7gpLLgpK/igIxcIixcbi8vICAgICBoZWFsdGhDYXJlQ2VudGVyOiBcIuCkuOCljeCkteCkuOCljeCkpSDgpKrgpLDgpL/gpJrgpLDgpY3gpK/gpL4g4KSV4KWH4KSC4KSm4KWN4KSwXCIsXG4vLyAgICAgcGV0cm9sUHVtcDogXCLgpKrgpYfgpJ/gpY3gpLDgpYvgpLIg4KSq4KSC4KSqXCIsXG4vLyAgICAgZ2FzV2FyZWhvdXNlQWdlbmN5OiBcIuCkl+CliOCkuCDgpJfgpYvgpKbgpL7gpK4v4KSP4KSc4KWH4KSC4KS44KWAXCIsXG4vLyAgICAgd2FyZWhvdXNlOiBcIuCkl+Cli+CkpuCkvuCkrlwiLFxuLy8gICAgIHdlbGZhcmVIYWxsOiBcIuCkleCksuCljeCkr+CkvuCkoyDgpK7gpILgpKHgpKpcIixcbi8vICAgICBtYXJyaWFnZUhvbWU6IFwi4KSu4KWI4KSw4KS/4KScIOCkueCli+CkrlwiLFxuLy8gICAgIG1hcnJpYWdlQ2x1YjogXCLgpLXgpL/gpLXgpL7gpLkg4KSV4KWN4KSy4KSsXCIsXG4vLyAgICAgY2x1YjogXCLgpJXgpY3gpLLgpKxcIixcbi8vICAgICBmYWN0b3J5OiBcIuCkleCkvuCksOCkluCkvuCkqOCkvlwiLFxuLy8gICAgIGhvdGVsOiBcIuCkueCli+Ckn+CkslwiLFxuLy8gICAgIHByaXZhdGVIb3RlbDogXCLgpKjgpL/gpJzgpYAg4KS54KWL4KSf4KSyXCIsXG4vLyAgICAgdXBUb1RocmVlU3RhckhvdGVsczogXCLgpKTgpYDgpKgg4KS44KWN4KSf4KS+4KSwIOCkpOCklSDgpJXgpYcg4KS54KWL4KSf4KSyXCIsXG4vLyAgICAgZm91clN0YXJBbmRBYm92ZUhvdGVsczogXCLgpJrgpL7gpLAg4KS44KS/4KSk4KS+4KSw4KS+IOCklOCksCDgpIngpLjgpJXgpYcg4KSK4KSq4KSwIOCkleClhyDgpLngpYvgpJ/gpLJcIixcbi8vICAgICBtdWx0aVN0b3JleUJ1aWxkaW5nOiBcIuCkrOCkueClgSDgpK7gpILgpJzgpL/gpLLgpL4g4KSH4KSu4KS+4KSw4KSkXCIsXG4vLyAgICAgYnVpbGRpbmc6IFwi4KSH4KSu4KS+4KSw4KSkXCIsXG4vLyAgICAgaG9hcmRpbmc6IFwi4KS54KWL4KSw4KWN4KSh4KS/4KSC4KSXXCIsXG4vLyAgICAgdHZUb3dlcjogXCLgpJ/gpYAu4KS14KWAIOCkn+CkvuCkteCksFwiLFxuLy8gICAgIHRlbGVjb21Ub3dlcjogXCLgpKbgpYLgpLDgpLjgpILgpJrgpL7gpLAg4KSf4KS+4KS14KSwXCIsXG4vLyAgICAgdG93ZXI6IFwi4KSf4KWJ4KS14KSwXCIsXG4vLyAgICAgYmFuazogXCLgpKzgpYjgpILgpJVcIixcbi8vICAgICBhdG06IFwi4KSP4KSf4KWA4KSP4KSuXCIsXG4vLyAgICAgcHJpdmF0ZUxpbWl0ZWRDb21wYW55OiBcIuCkquCljeCksOCkvi4g4KSy4KS/4KSu4KS/4KSf4KWH4KShIOCkleCkguCkquCkqOClgFwiLFxuLy8gICAgIHB1YnM6IFwi4KSq4KSs4KWN4KS4XCIsXG4vLyAgICAgYmFyOiBcIuCkrOCkvuCksFwiLFxuLy8gICAgIGhvdGVsQmFyOiBcIuCkueCli+Ckn+Cksi/gpKzgpL7gpLBcIixcbi8vICAgICBob3RlbFJlc3RhdXJhbnQ6IFwi4KS54KWL4KSf4KSyL+CksOClh+CkuOCljeCkn+Cli+CksOClh+CkguCkn1wiLFxuLy8gICAgIGxpcXVvclNob3BCZWVyQmFyOiBcIuCktuCksOCkvuCkrCDgpJXgpYAg4KSm4KWB4KSV4KS+4KSoIC8g4KSs4KS/4KSv4KSwIOCkrOCkvuCksFwiXG4vLyAgIH0sXG4vLyAgIGNhdGVnb3J5NDoge1xuLy8gICAgIG90aGVyOiBcIuCkheCkqOCljeCkr1wiLFxuLy8gICAgIG90aGVyRXN0YWJsaXNobWVudDogXCLgpIXgpKjgpY3gpK8g4KSq4KWN4KSw4KSk4KS/4KS34KWN4KSg4KS+4KSoXCIsXG4vLyAgICAgcmVzaWRlbmNlQW5kQ2xpbmljOiBcIuCkhuCkteCkvuCkuCDgpJTgpLAg4KSV4KWN4KSy4KS/4KSo4KS/4KSVXCIsXG4vLyAgICAgcmVzaWRlbmNlQW5kU2hvcDogXCLgpIbgpLXgpL7gpLgg4KSU4KSwIOCkpuClgeCkleCkvuCkqFwiLFxuLy8gICAgIHJlc2lkZW5jZUFuZE1lZGljYWxTdG9yZTogXCLgpIbgpLXgpL7gpLgg4KSU4KSwIOCkruClh+CkoeCkv+CkleCksiDgpLjgpY3gpJ/gpYvgpLBcIixcbi8vICAgICByZXNpZGVuY2U6IFwi4KS14KS+4KS44KSX4KWD4KS5XCIsXG4vLyAgICAgcGxvdDogXCLgpK3gpYLgpJbgpILgpKFcIixcbi8vICAgICBmbGF0OiBcIuCkq+CljeCksuCliOCkn1wiLFxuLy8gICAgIGxpYnJhcnk6IFwi4KSq4KWB4KS44KWN4KSk4KSV4KS+4KSy4KSvXCIsXG4vLyAgICAgYmFucXVldEhhbGw6IFwi4KSs4KWI4KSC4KSV4KWN4KS14KWH4KSfIOCkueClieCkslwiLFxuLy8gICAgIG1hbGxzOiBcIuCkruClieCksuCljeCkuFwiLFxuLy8gICAgIG11bHRpcGxleDogXCLgpK7gpLLgpY3gpJ/gpYDgpKrgpY3gpLLgpYfgpJXgpY3gpLhcIixcbi8vICAgICBsYWJvcmF0b3JpZXM6IFwi4KSq4KWN4KSw4KSv4KWL4KSX4KS24KS+4KSy4KS+4KSP4KSCXCJcbi8vICAgfVxuLy8gfVxuXG5jb25zdCBNdWx0aXBsaWVyQ29tbWVyY2lhbCA9IHtcbiAgY2F0ZWdvcnkxOiB7XG4gICAgaG9zdGVsOiBcIuCkm+CkvuCkpOCljeCksOCkvuCkteCkvuCkuFwiLFxuICAgIHNwb3J0c0NlbnRlcjogXCLgpJXgpY3gpLDgpYDgpZzgpL4g4KSV4KWH4KSC4KSm4KWN4KSwXCIsXG4gICAgY2x1YjogXCLgpJXgpY3gpLLgpKxcIixcbiAgICBwaHlzaWNhbEhlYWx0aENlbnRlckV0YzogXCLgpLbgpL7gpLDgpYDgpLDgpL/gpJUg4KS44KWN4KS14KS+4KS44KWN4KSl4KWN4KSvIOCkleClh+CkguCkpuCljeCksCDgpIbgpKbgpL9cIixcbiAgICB0aGVhdGVyOiBcIuCkpeCkv+Ckj+Ckn+CksFwiLCAgICAvLyBvbiBob2xkXG4gICAgY2luZW1hSGFsbDogXCLgpJrgpLLgpY3gpJrgpL/gpKTgpY3gpLAg4KSX4KS5XCIsXG4gICAgc2hvcDogXCLgpKbgpYHgpJXgpL7gpKhcIixcbiAgICBsaXF1b3JTaG9wQmVlckJhcjogXCLgpLbgpLDgpL7gpKwg4KSV4KWAIOCkpuClgeCkleCkvuCkqCAvIOCkrOCkv+Ckr+CksCDgpKzgpL7gpLBcIixcbiAgICBneW06IFwi4KSc4KS/4KSuXCIsXG4gICAgd2VsZmFyZUhhbGw6IFwi4KSV4KSy4KWN4KSv4KS+4KSjIOCkruCkguCkoeCkqlwiLFxuICAgIGhhaXJEcmVzc2VyOiBcIuCkqOCkvuCkiCAvIOCkueClh+Ckr+CksCDgpKHgpY3gpLDgpYfgpLjgpLBcIiAvLyBub3QgaW4geW91ciBvYmplY3QgZXhwbGljaXRseSwgYnV0IGZyb20gc2NyZWVuc2hvdFxuICB9LFxuXG4gIGNhdGVnb3J5Mjoge1xuICAgIG1lZGljYWxTdG9yZTogXCLgpK7gpYfgpKHgpL/gpJXgpLIg4KS44KWN4KSf4KWL4KSwXCIsXG4gICAgcmVzaWRlbmNlQW5kTWVkaWNhbFN0b3JlOiBcIuCkhuCkteCkvuCkuCDgpJTgpLAg4KSu4KWH4KSh4KS/4KSV4KSyIOCkuOCljeCkn+Cli+CksFwiLFxuICAgIG11bHRpU3RvcmV5Q29tbWVyY2lhbEVzdGFibGlzaG1lbnQ6IFwi4KSs4KS54KWBIOCkruCkguCknOCkv+CksuCkviDgpLXgpY3gpK/gpLXgpLjgpL7gpK/gpL/gpJUg4KSq4KWN4KSw4KSk4KS/4KS34KWN4KSg4KS+4KSoXCIsXG4gICAgcHJpdmF0ZUxpbWl0ZWRDb21wYW55OiBcIuCkquCljeCksOCkvi4g4KSy4KS/4KSu4KS/4KSf4KWH4KShIOCkleCkguCkquCkqOClgFwiLFxuICAgIGdvdmVybm1lbnRDb2FjaGluZzogXCLgpLjgpLDgpJXgpL7gpLDgpYAg4KSV4KWL4KSa4KS/4KSC4KSXIOCkuOClh+CkguCkn+CksFwiIC8vIG1hcHBpbmcgYXMgcGVyIHNjcmVlbnNob3RcbiAgfSxcblxuICBjYXRlZ29yeTM6IHtcbiAgICBnb3Zlcm5tZW50T2ZmaWNlOiBcIuCkuOCksOCkleCkvuCksOClgCDgpJXgpL7gpLDgpY3gpK/gpL7gpLLgpK9cIixcbiAgICBzZW1pR292ZXJubWVudE9mZmljZTogXCLgpIXgpLDgpY3gpKfgpLjgpLDgpJXgpL7gpLDgpYAg4KSV4KS+4KSw4KWN4KSv4KS+4KSy4KSvXCIsXG4gICAgb2ZmaWNlOiBcIuCkkeCkq+Ckv+CkuFwiLFxuICAgIGhvc3BpdGFsOiBcIuCkmuCkv+CkleCkv+CkpOCljeCkuOCkvuCksuCkr+KAjFwiLFxuICAgIG51cnNpbmdIb21lOiBcIuCkqOCksOCljeCkuOCkv+CkguCklyDgpLngpYvgpK5cIixcbiAgICBkaWFnbm9zdGljQ2VudGVyOiBcIuCkoeCkvuCkr+Ckl+CljeCkqOCli+CkuOCljeCkn+Ckv+CklSDgpJXgpYfgpILgpKbgpY3gpLBcIixcbiAgICBsYWJvcmF0b3JpZXM6IFwi4KSq4KWN4KSw4KSv4KWL4KSX4KS24KS+4KSy4KS+4KSP4KSCXCIsXG4gICAgcG9seWNsaW5pYzogXCLgpKrgpL7gpLLgpYDgpJXgpY3gpLLgpL/gpKjgpL/gpJVcIixcbiAgICBjb2FjaGluZ0NlbnRlcjogXCLgpJXgpYvgpJrgpL/gpILgpJdcIixcbiAgICBpbmR1c3RyaWFsVW5pdHM6IFwi4KSU4KSm4KWN4KSv4KWL4KSX4KS/4KSVIOCkh+CkleCkvuCkiOCkr+CkvuCkglwiLFxuICAgIGZhY3Rvcnk6IFwi4KSV4KS+4KSw4KSW4KS+4KSo4KS+XCIsXG4gICAgbXVsdGlwbGV4OiBcIuCkruCksuCljeCkn+ClgOCkquCljeCksuClh+CkleCljeCkuFwiLFxuICAgIG1hbGxzOiBcIuCkruClieCksuCljeCkuFwiLFxuICAgIGhvdGVsOiBcIuCkueCli+Ckn+CkslwiLFxuICAgIHVwVG9UaHJlZVN0YXJIb3RlbHM6IFwi4KSk4KWA4KSoIOCkuOCljeCkn+CkvuCksCDgpKTgpJUg4KSV4KWHIOCkueCli+Ckn+CkslwiLFxuICAgIGZvdXJTdGFyQW5kQWJvdmVIb3RlbHM6IFwi4KSa4KS+4KSwIOCkuOCkv+CkpOCkvuCksOCkviDgpJTgpLAg4KSJ4KS44KSV4KWHIOCkiuCkquCksCDgpJXgpYcg4KS54KWL4KSf4KSyXCIsXG4gICAgaG90ZWxCYXI6IFwi4KS54KWL4KSf4KSyL+CkrOCkvuCksFwiLFxuICAgIGhvdGVsUmVzdGF1cmFudDogXCLgpLngpYvgpJ/gpLIv4KSw4KWH4KS44KWN4KSf4KWL4KSw4KWH4KSC4KSfXCIsXG4gICAgYmFyOiBcIuCkrOCkvuCksFwiLFxuICAgIHB1YnM6IFwi4KSq4KSs4KWN4KS4XCIsXG4gICAgYmFucXVldEhhbGw6IFwi4KSs4KWI4KSC4KSV4KWN4KS14KWH4KSfIOCkueClieCkslwiLFxuICAgIG1hcnJpYWdlSG9tZTogXCLgpK7gpYjgpLDgpL/gpJwg4KS54KWL4KSuXCIsXG4gICAgbWFycmlhZ2VDbHViOiBcIuCkteCkv+CkteCkvuCkuSDgpJXgpY3gpLLgpKxcIixcbiAgICB3ZWxmYXJlSGFsbDogXCLgpJXgpLLgpY3gpK/gpL7gpKMg4KSu4KSC4KSh4KSqXCIsXG4gICAgdHZUb3dlcjogXCLgpJ/gpYAu4KS14KWAIOCkn+CkvuCkteCksFwiLFxuICAgIHRlbGVjb21Ub3dlcjogXCLgpKbgpYLgpLDgpLjgpILgpJrgpL7gpLAg4KSf4KS+4KS14KSwXCIsXG4gICAgdG93ZXI6IFwi4KSf4KWJ4KS14KSwXCIsXG4gICAgcGV0cm9sUHVtcDogXCLgpKrgpYfgpJ/gpY3gpLDgpYvgpLIg4KSq4KSC4KSqXCIsXG4gICAgYmFuazogXCLgpKzgpYjgpILgpJVcIixcbiAgICBnYXJhZ2U6IFwi4KSX4KWI4KSw4KS+4KScXCIsXG4gICAgY29hbERlcG90OiBcIuCkleCli+CksuCljSDgpKHgpL/gpKrgpYtcIixcbiAgICB3YXJlaG91c2U6IFwi4KSX4KWL4KSm4KS+4KSuXCIsXG4gICAgZ2FzV2FyZWhvdXNlQWdlbmN5OiBcIuCkl+CliOCkuCDgpJfgpYvgpKbgpL7gpK4v4KSP4KSc4KWH4KSC4KS44KWAXCJcbiAgfSxcblxuICBjYXRlZ29yeTQ6IHtcbiAgICBvdGhlcjogXCLgpIXgpKjgpY3gpK9cIixcbiAgICBvdGhlckVzdGFibGlzaG1lbnQ6IFwi4KSF4KSo4KWN4KSvIOCkquCljeCksOCkpOCkv+Ckt+CljeCkoOCkvuCkqFwiLFxuICAgIHJlc2lkZW5jZTogXCLgpLXgpL7gpLjgpJfgpYPgpLlcIixcbiAgICByZXNpZGVuY2VBbmRDbGluaWM6IFwi4KSG4KS14KS+4KS4IOCklOCksCDgpJXgpY3gpLLgpL/gpKjgpL/gpJVcIixcbiAgICByZXNpZGVuY2VBbmRTaG9wOiBcIuCkhuCkteCkvuCkuCDgpJTgpLAg4KSm4KWB4KSV4KS+4KSoXCIsXG4gICAgYnVpbGRpbmc6IFwi4KSH4KSu4KS+4KSw4KSkXCIsXG4gICAgbXVsdGlTdG9yZXlCdWlsZGluZzogXCLgpKzgpLngpYEg4KSu4KSC4KSc4KS/4KSy4KS+IOCkh+CkruCkvuCksOCkpFwiLFxuICAgIHBsb3Q6IFwi4KSt4KWC4KSW4KSC4KShXCIsXG4gICAgZmxhdDogXCLgpKvgpY3gpLLgpYjgpJ9cIixcbiAgICBnb3Zlcm5tZW50QnVpbGRpbmc6IFwi4KS44KSw4KSV4KS+4KSw4KWAIOCkreCkteCkqFwiLFxuICAgIGdvdmVybm1lbnRTY2hvb2w6IFwi4KS44KSw4KSV4KS+4KSw4KWAIOCkteCkv+CkpuCljeCkr+CkvuCksuCkr1wiLFxuICAgIGxpYnJhcnk6IFwi4KSq4KWB4KS44KWN4KSk4KSV4KS+4KSy4KSvXCIsXG4gICAgZWR1Y2F0aW9uYWxJbnN0aXR1dGlvbjogXCLgpLbgpL/gpJXgpY3gpLfgpKMg4KS44KSC4KS44KWN4KSl4KS+4KSoXCIsXG4gICAgaG9hcmRpbmc6IFwi4KS54KWL4KSw4KWN4KSh4KS/4KSC4KSXXCJcbiAgfVxufTtcblxuY29uc3QgQ29uc3RydWN0aW9uVHlwZSA9IHtcbiAgcGVybWFuZW50V2l0aFJjY1JiY1Jvb2Y6IFwi4KSq4KSV4KWN4KSV4KS+IOCkreCkteCkqCAvIFJDQyDgpK/gpL4gUkJDIOCkm+CkpCDgpLjgpLngpL/gpKRcIixcbiAgcGVybWFuZW50V2l0aEFzYmVzdG9zRmliZXJUaW5TaGVkOiBcIuCkheCkqOCljeCkryDgpKrgpJXgpY3gpJXgpL4g4KSt4KS14KSoLCDgpJDgpLjgpKzgpYfgpLjgpY3gpJ/gpLggLyDgpKvgpL7gpIfgpKzgpLAg4KSv4KS+IOCkn+ClgOCkqCDgpLbgpYfgpKFcIixcbiAgdGVtcG9yYXJ5T3JPdGhlckJ1aWxkaW5nOiBcIuCkleCkmuCljeCkmuCkviDgpK3gpLXgpKgg4KSv4KS+IOCkheCkqOCljeCkryDgpLjgpK7gpLjgpY3gpKQg4KSt4KS14KSoXCIsXG4gIHBsb3Q6IFwi4KSt4KWC4KSW4KSC4KShXCJcbn07XG5cbmNvbnN0IFJvYWRXaWR0aFR5cGUgPSB7XG4gIGxlc3NUaGFuOW06IFwiOSDgpK7gpYDgpJ/gpLAg4KS44KWHIOCkleCkriDgpJrgpYzgpKHgpLzgpYAg4KS44KSh4KS84KSVXCIsXG4gIGZyb205dG8xMm06IFwiOSDgpLjgpYcgMTIg4KSu4KWA4KSf4KSwIOCkmuCljOCkoeCkvOClgCDgpLjgpKHgpLzgpJVcIixcbiAgZnJvbTEydG8yNG06IFwiMTIg4KS44KWHIDI0IOCkruClgOCkn+CksCDgpJrgpYzgpKHgpLzgpYAg4KS44KSh4KS84KSVXCIsXG4gIG1vcmVUaGFuMjRtOiBcIjI0IOCkruClgOCkn+CksCDgpLjgpYcg4KSF4KSn4KS/4KSVIOCkmuCljOCkoeCkvOClgCDgpLjgpKHgpLzgpJVcIlxufTtcblxuXG5jb25zdCBQcm9wZXJ0eVR5cGVSZXZlcnNlTWFwcGluZyA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhQcm9wZXJ0eVR5cGUpLm1hcCgoW2tleSAsIHZhbHVlXSkgPT4gW3ZhbHVlICwga2V5XSkpXG5cbmNvbnN0IENvbnN0cnVjdGlvblR5cGVSZXZlcnNlTWFwcGluZyA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhDb25zdHJ1Y3Rpb25UeXBlKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gW3ZhbHVlICwga2V5XSkpXG5cbmNvbnN0IFJvYWRXaWR0aFR5cGVSZXZlcnNlTWFwcGluZyA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhSb2FkV2lkdGhUeXBlKS5tYXAoKFtrZXkgLCB2YWx1ZV0pPT4gW3ZhbHVlICwga2V5XSApKVxuXG5cblxuY29uc3QgcmVzZXJ2ZXJUaGVPYmplY3QgPSAob2JqZWN0KT0+e1xuICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKChba2V5ICwgdmFsdWVdKT0+IFt2YWx1ZSAsIGtleV0gKSlcbn1cblxuXG5jb25zdCBnZXRLZXlCeVZhbHVlID0gKHZhbHVlICwgb2JqKT0+e1xuXHRjb25zdCBibG9jayA9IE9iamVjdC5lbnRyaWVzKG9iaikuZmluZCgoZWwpPT4gZWxbMV0gPT09IHZhbHVlKVxuXHRyZXR1cm4gYmxvY2sgPyBibG9ja1swXSA6IG51bGxcbn1cblxuXG5leHBvcnQge0NvbnN0cnVjdGlvblR5cGUgLCBQcm9wZXJ0eVR5cGUgLCBnZXRLZXlCeVZhbHVlICwgUHJvcGVydHlUeXBlUmV2ZXJzZU1hcHBpbmcgLCBDb25zdHJ1Y3Rpb25UeXBlUmV2ZXJzZU1hcHBpbmcgLCBSb2FkV2lkdGhUeXBlUmV2ZXJzZU1hcHBpbmcgLCBSb2FkV2lkdGhUeXBlICwgTXVsdGlwbGllckNvbW1lcmNpYWx9IiwiZXhwb3J0IGNvbnN0IGJ1aWxkT2plY3QgPSAoZmxhdHRlbk9iamVjdCAsIHByb3BlcnR5KT0+e1xuXHRjb25zdCBvYmogPSB7fVxuXG5cdC8vIGNvbnNvbGUubG9nKFwicHJvcGVydHkgcGF0aCBpcyA6IFwiICwgcHJvcGVydHkucGF0aClcblxuXHRPYmplY3QuZW50cmllcyhmbGF0dGVuT2JqZWN0KS5tYXAoKCBba2V5ICwgdmFsdWVdICk9PntcblxuXHRcdGlmKGtleS5zdGFydHNXaXRoKGAke3Byb3BlcnR5LnBhdGh9YCkpIG9ialtrZXkuc3BsaXQoXCIuXCIpWzFdXSA9IHZhbHVlXG5cblx0fSlcblxuXHQvLyBjb25zb2xlLmxvZyhcIm9iamVjdCBpcyA6IFwiICwgb2JqKVxuXG5cdHJldHVybiBvYmpcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3Rpb25UeXBlLCBSb2FkV2lkdGhUeXBlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2RhdGEuanNcIjtcbmltcG9ydCB7IGJ1aWxkT2plY3QgfSBmcm9tIFwiLi4vYWRtaW5VdGlscy9hZG1pblV0aWxzLmpzXCI7XG5cblxuXG5jb25zdCBSYXRlTW9kZWxFZGl0ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVjb3JkLCBvbkNoYW5nZSwgcHJvcGVydHkgfSA9IHByb3BzO1xuXG5cbiAgY29uc29sZS5sb2coXCJwcm9wZXJ0eSA6IFwiICwgcHJvcGVydHkucGF0aClcbiAgY29uc29sZS5sb2coXCJyZWNvcmQgOiBcIiAsIHJlY29yZClcblxuXG4vLyBoZXJlIEkgYW0gcmVjaWV2aW5nIHRoZSBjdXN0b20gcGF0aCB0aGF0IEkgYW0gcGFzc2luZyBmcm9tIG15IGFkbWluIGpzICwgd2hlcmUgSSBhbSBjYWxsaW5nIHRoaXMgY29tcG9uZW50IGluc2lkZSB0aGUgcHJvcGVydCB0YWJcbmNvbnN0IHBhdGggPSBwcm9wZXJ0eS5wYXRoXG4vLyBjb25zb2xlLmxvZyhcIvCfkoEgcGF0aCBpcyA6IFwiICwgcGF0aClcblxuXG5cbi8vIGhlcmUgd2UgYXJlIGNyZWF0aW5nIGEgdmFsaWQganMgb2JqZWN0ICwgYmVjYXVzZSBhZG1pbmpzIGZsYXR0ZW4gdGhlIG5lc3RlZCBvYmplY3RcbmNvbnN0IHZhbHVlID0gYnVpbGRPamVjdChyZWNvcmQucGFyYW1zICwgcHJvcGVydHkpXG4vLyBjb25zb2xlLmxvZyhcIvCfmoAgdmFsdWUgaXMgOiBcIiAsIHZhbHVlKVxuXG5cblxuXG4gIC8vIEhhbmRsZSBjaGFuZ2UgZm9yIG5lc3RlZCBmaWVsZFxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoa2V5LCBuZXdWYWx1ZSkgPT4ge1xuXHRjb25zb2xlLmxvZyhcInRyaWVkIGNhbGxpbmcgaGFuZGxlIGNoYW5nZSBmdW5jdGlvbiAuLi4uLi4uXCIpXG4gICAgb25DaGFuZ2UgJiYgb25DaGFuZ2UoYCR7cHJvcGVydHkucGF0aH0uJHtrZXl9YCwgbmV3VmFsdWUpO1xuICB9O1xuXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgIDxoMyBzdHlsZT17c3R5bGVzLmhlYWRlcn0+e1JvYWRXaWR0aFR5cGVbcHJvcGVydHkucGF0aF19PC9oMz5cbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5maWVsZHNDb250YWluZXJ9PlxuICAgICAgICB7T2JqZWN0LmVudHJpZXMoQ29uc3RydWN0aW9uVHlwZSkubWFwKChba2V5LCBsYWJlbF0pID0+IChcbiAgICAgICAgICA8ZGl2IGtleT17a2V5fSBzdHlsZT17c3R5bGVzLmZpZWxkfT5cbiAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17c3R5bGVzLmxhYmVsfT57bGFiZWx9IGthIDxzcGFuIHN0eWxlPXt7Zm9udFdlaWdodCA6IFwiYm9sZFwifX0gPuCkpuCksDwvc3Bhbj4gPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZVtrZXldIHx8IFwiXCJ9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtgRW50ZXIgJHtsYWJlbH0ga2EgcmF0ZWB9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlQ2hhbmdlKGtleSwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLmlucHV0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIElubGluZSBzdHlsZXMgKHlvdSBjYW4gcmVwbGFjZSB3aXRoIENTUyBvciBzdHlsZWQtY29tcG9uZW50cylcbmNvbnN0IHN0eWxlcyA9IHtcbiAgY29udGFpbmVyOiB7XG4gICAgcGFkZGluZzogXCIxNnB4XCIsXG4gICAgYmFja2dyb3VuZENvbG9yOiBcIiNmOWY5ZjlcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXG4gICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjZGRkXCIsXG4gICAgbWFyZ2luQm90dG9tOiBcIjE2cHhcIixcbiAgfSxcbiAgaGVhZGVyOiB7XG4gICAgZm9udFNpemU6IFwiMThweFwiLFxuICAgIG1hcmdpbkJvdHRvbTogXCIxMnB4XCIsXG4gICAgY29sb3I6IFwiIzMzM1wiLFxuICB9LFxuICBmaWVsZHNDb250YWluZXI6IHtcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgIGdhcDogXCIxMnB4XCIsXG4gIH0sXG4gIGZpZWxkOiB7XG4gICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgfSxcbiAgbGFiZWw6IHtcbiAgICBtYXJnaW5Cb3R0b206IFwiNHB4XCIsXG4gICAgZm9udFdlaWdodDogXCI1MDBcIixcbiAgICBjb2xvcjogXCIjNTU1XCIsXG4gIH0sXG4gIGlucHV0OiB7XG4gICAgcGFkZGluZzogXCI4cHggMTJweFwiLFxuICAgIGJvcmRlclJhZGl1czogXCI0cHhcIixcbiAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NcIixcbiAgICBmb250U2l6ZTogXCIxNHB4XCIsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSYXRlTW9kZWxFZGl0O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTGFiZWwsIElucHV0LCBCb3gsIEJ1dHRvbiB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XG5cbmNvbnN0IEdldExvY2F0aW9uID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVjb3JkLCBvbkNoYW5nZSwgcHJvcGVydHkgfSA9IHByb3BzO1xuXG4gIGNvbnNvbGUubG9nKFwiaW5zaWRlIHRoZSBsb2NhdGlvbidzIGN1c3RvbSBjb21wb25lbnRcIik7XG4gIGNvbnNvbGUubG9nKFwicmVjb3JkIDogXCIsIHJlY29yZCk7XG4gIGNvbnNvbGUubG9nKFwicHJvcGVydHkgOiBcIiwgcHJvcGVydHkpO1xuXG4gIC8vIGV4dHJhY3QgbmVzdGVkIGxvY2F0aW9uIHZhbHVlc1xuICBjb25zdCBsYXRpdHVkZSA9IHJlY29yZD8ucGFyYW1zW1wibG9jYXRpb24ubGF0aXR1ZGVcIl0gfHwgXCJcIjsgXG4gIGNvbnN0IGxvbmdpdHVkZSA9IHJlY29yZD8ucGFyYW1zW1wibG9jYXRpb24ubG9uZ2l0dWRlXCJdIHx8IFwiXCI7XG5cbiAgY29uc3QgaGFuZGxlR2V0TG9jYXRpb24gPSAoKSA9PiB7XG4gICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAgKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgbGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICAgIGNvbnN0IGxvbiA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG5cbiAgICAgICAgICAvLyB1cGRhdGUgQWRtaW5KUyBmb3JtIHZhbHVlc1xuICAgICAgICAgIG9uQ2hhbmdlKFwibG9jYXRpb24ubGF0aXR1ZGVcIiwgbGF0KTtcbiAgICAgICAgICBvbkNoYW5nZShcImxvY2F0aW9uLmxvbmdpdHVkZVwiLCBsb24pO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgbG9jYXRpb246XCIsIGVycm9yKTtcbiAgICAgICAgICBhbGVydChcIlVuYWJsZSB0byBmZXRjaCBsb2NhdGlvbi4gUGxlYXNlIGFsbG93IGxvY2F0aW9uIGFjY2Vzcy5cIik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGJyb3dzZXIuXCIpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggc3R5bGU9e3ttYXJnaW4gOiBcIjI1cHggMHB4XCJ9fSA+XG4gICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZ2FwPVwiMTBweFwiPlxuICAgICAgICA8SW5wdXRcbiAgICAgICAgICB3aWR0aD17MSAvIDJ9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJMYXRpdHVkZVwiXG4gICAgICAgICAgdmFsdWU9e2xhdGl0dWRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoXCJsb2NhdGlvbi5sYXRpdHVkZVwiLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIC8+XG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIHdpZHRoPXsxIC8gMn1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkxvbmdpdHVkZVwiXG4gICAgICAgICAgdmFsdWU9e2xvbmdpdHVkZX1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKFwibG9jYXRpb24ubG9uZ2l0dWRlXCIsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuXG4gICAgICA8Qm94IG1hcmdpblRvcD1cIjEwcHhcIj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtoYW5kbGVHZXRMb2NhdGlvbn0+XG4gICAgICAgICAgR2V0IExvY2F0aW9uXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHZXRMb2NhdGlvbjtcbiIsImltcG9ydCB7IERyb3Bab25lLCBEcm9wWm9uZUl0ZW0sIEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQsIHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmNvbnN0IEVkaXQgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XG4gICAgY29uc3QgeyB0cmFuc2xhdGVQcm9wZXJ0eSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkO1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBjb25zdCBwYXRoID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgY29uc3Qga2V5ID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IGZpbGUgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUHJvcGVydHkpO1xuICAgIGNvbnN0IFtvcmlnaW5hbEtleSwgc2V0T3JpZ2luYWxLZXldID0gdXNlU3RhdGUoa2V5KTtcbiAgICBjb25zdCBbZmlsZXNUb1VwbG9hZCwgc2V0RmlsZXNUb1VwbG9hZF0gPSB1c2VTdGF0ZShbXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gaXQgbWVhbnMgbWVhbnMgdGhhdCBzb21lb25lIGhpdCBzYXZlIGFuZCBuZXcgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgICAgICAvLyBpbiB0aGlzIGNhc2UgZmxpZXNUb1VwbG9hZCBzaG91bGQgYmUgY2xlYXJlZC5cbiAgICAgICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gdXNlciB0dXJucyBvZmYgcmVkaXJlY3QgYWZ0ZXIgbmV3L2VkaXRcbiAgICAgICAgaWYgKCh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkgIT09IG9yaWdpbmFsS2V5KVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmICFvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiBBcnJheS5pc0FycmF5KGtleSkgJiYga2V5Lmxlbmd0aCAhPT0gb3JpZ2luYWxLZXkubGVuZ3RoKSkge1xuICAgICAgICAgICAgc2V0T3JpZ2luYWxLZXkoa2V5KTtcbiAgICAgICAgICAgIHNldEZpbGVzVG9VcGxvYWQoW10pO1xuICAgICAgICB9XG4gICAgfSwgW2tleSwgb3JpZ2luYWxLZXldKTtcbiAgICBjb25zdCBvblVwbG9hZCA9IChmaWxlcykgPT4ge1xuICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKGZpbGVzKTtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgZmlsZXMpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU11bHRpUmVtb3ZlID0gKHNpbmdsZUtleSkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IChmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpIHx8IFtdKS5pbmRleE9mKHNpbmdsZUtleSk7XG4gICAgICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5KSB8fCBbXTtcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5tYXAoKGN1cnJlbnRQYXRoLCBpKSA9PiAoaSAhPT0gaW5kZXggPyBjdXJyZW50UGF0aCA6IG51bGwpKTtcbiAgICAgICAgICAgIGxldCBuZXdQYXJhbXMgPSBmbGF0LnNldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5LCBbLi4uZmlsZXNUb0RlbGV0ZSwgaW5kZXhdKTtcbiAgICAgICAgICAgIG5ld1BhcmFtcyA9IGZsYXQuc2V0KG5ld1BhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHksIG5ld1BhdGgpO1xuICAgICAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG5ld1BhcmFtcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2Fubm90IHJlbW92ZSBmaWxlIHdoZW4gdGhlcmUgYXJlIG5vIHVwbG9hZGVkIGZpbGVzIHlldCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCBudWxsLCB0cmFuc2xhdGVQcm9wZXJ0eShwcm9wZXJ0eS5sYWJlbCwgcHJvcGVydHkucmVzb3VyY2VJZCkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lLCB7IG9uQ2hhbmdlOiBvblVwbG9hZCwgbXVsdGlwbGU6IGN1c3RvbS5tdWx0aXBsZSwgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IGN1c3RvbS5taW1lVHlwZXMsXG4gICAgICAgICAgICAgICAgbWF4U2l6ZTogY3VzdG9tLm1heFNpemUsXG4gICAgICAgICAgICB9LCBmaWxlczogZmlsZXNUb1VwbG9hZCB9KSxcbiAgICAgICAgIWN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYgcGF0aCAmJiAhZmlsZXNUb1VwbG9hZC5sZW5ndGggJiYgZmlsZSAhPT0gbnVsbCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsgZmlsZW5hbWU6IGtleSwgc3JjOiBwYXRoLCBvblJlbW92ZTogaGFuZGxlUmVtb3ZlIH0pKSxcbiAgICAgICAgY3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBrZXkubGVuZ3RoICYmIHBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwga2V5Lm1hcCgoc2luZ2xlS2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSByZW1vdmUgaXRlbXMgd2Ugc2V0IG9ubHkgcGF0aCBpbmRleCB0byBudWxscy5cbiAgICAgICAgICAgIC8vIGtleSBpcyBzdGlsbCB0aGVyZS4gVGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIG1haW50YWluIGFsbCB0aGUgaW5kZXhlcy4gU28gaGVyZSB3ZSBzaW1wbHkgZmlsdGVyIG91dCBlbGVtZW50cyB3aGljaFxuICAgICAgICAgICAgLy8gd2VyZSByZW1vdmVkIGFuZCBkaXNwbGF5IG9ubHkgd2hhdCB3YXMgbGVmdFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoW2luZGV4XTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lSXRlbSwgeyBrZXk6IHNpbmdsZUtleSwgZmlsZW5hbWU6IHNpbmdsZUtleSwgc3JjOiBwYXRoW2luZGV4XSwgb25SZW1vdmU6ICgpID0+IGhhbmRsZU11bHRpUmVtb3ZlKHNpbmdsZUtleSkgfSkpIDogJyc7XG4gICAgICAgIH0pKSkgOiAnJykpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEVkaXQ7XG4iLCJleHBvcnQgY29uc3QgQXVkaW9NaW1lVHlwZXMgPSBbXG4gICAgJ2F1ZGlvL2FhYycsXG4gICAgJ2F1ZGlvL21pZGknLFxuICAgICdhdWRpby94LW1pZGknLFxuICAgICdhdWRpby9tcGVnJyxcbiAgICAnYXVkaW8vb2dnJyxcbiAgICAnYXBwbGljYXRpb24vb2dnJyxcbiAgICAnYXVkaW8vb3B1cycsXG4gICAgJ2F1ZGlvL3dhdicsXG4gICAgJ2F1ZGlvL3dlYm0nLFxuICAgICdhdWRpby8zZ3BwMicsXG5dO1xuZXhwb3J0IGNvbnN0IFZpZGVvTWltZVR5cGVzID0gW1xuICAgICd2aWRlby94LW1zdmlkZW8nLFxuICAgICd2aWRlby9tcGVnJyxcbiAgICAndmlkZW8vb2dnJyxcbiAgICAndmlkZW8vbXAydCcsXG4gICAgJ3ZpZGVvL3dlYm0nLFxuICAgICd2aWRlby8zZ3BwJyxcbiAgICAndmlkZW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBJbWFnZU1pbWVUeXBlcyA9IFtcbiAgICAnaW1hZ2UvYm1wJyxcbiAgICAnaW1hZ2UvZ2lmJyxcbiAgICAnaW1hZ2UvanBlZycsXG4gICAgJ2ltYWdlL3BuZycsXG4gICAgJ2ltYWdlL3N2Zyt4bWwnLFxuICAgICdpbWFnZS92bmQubWljcm9zb2Z0Lmljb24nLFxuICAgICdpbWFnZS90aWZmJyxcbiAgICAnaW1hZ2Uvd2VicCcsXG5dO1xuZXhwb3J0IGNvbnN0IENvbXByZXNzZWRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcDInLFxuICAgICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgICAnYXBwbGljYXRpb24vamF2YS1hcmNoaXZlJyxcbiAgICAnYXBwbGljYXRpb24veC10YXInLFxuICAgICdhcHBsaWNhdGlvbi96aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnLFxuXTtcbmV4cG9ydCBjb25zdCBEb2N1bWVudE1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24veC1hYml3b3JkJyxcbiAgICAnYXBwbGljYXRpb24veC1mcmVlYXJjJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vaycsXG4gICAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQucmFyJyxcbiAgICAnYXBwbGljYXRpb24vcnRmJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXTtcbmV4cG9ydCBjb25zdCBUZXh0TWltZVR5cGVzID0gW1xuICAgICd0ZXh0L2NzcycsXG4gICAgJ3RleHQvY3N2JyxcbiAgICAndGV4dC9odG1sJyxcbiAgICAndGV4dC9jYWxlbmRhcicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICdhcHBsaWNhdGlvbi9sZCtqc29uJyxcbiAgICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAndGV4dC9wbGFpbicsXG4gICAgJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3htbCcsXG4gICAgJ3RleHQveG1sJyxcbl07XG5leHBvcnQgY29uc3QgQmluYXJ5RG9jc01pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuICAgICdhcHBsaWNhdGlvbi9wZGYnLFxuXTtcbmV4cG9ydCBjb25zdCBGb250TWltZVR5cGVzID0gW1xuICAgICdmb250L290ZicsXG4gICAgJ2ZvbnQvdHRmJyxcbiAgICAnZm9udC93b2ZmJyxcbiAgICAnZm9udC93b2ZmMicsXG5dO1xuZXhwb3J0IGNvbnN0IE90aGVyTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICdhcHBsaWNhdGlvbi94LWNzaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5pbnN0YWxsZXIreG1sJyxcbiAgICAnYXBwbGljYXRpb24veC1odHRwZC1waHAnLFxuICAgICdhcHBsaWNhdGlvbi94LXNoJyxcbiAgICAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAgICd2bmQudmlzaW8nLFxuICAgICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJyxcbl07XG5leHBvcnQgY29uc3QgTWltZVR5cGVzID0gW1xuICAgIC4uLkF1ZGlvTWltZVR5cGVzLFxuICAgIC4uLlZpZGVvTWltZVR5cGVzLFxuICAgIC4uLkltYWdlTWltZVR5cGVzLFxuICAgIC4uLkNvbXByZXNzZWRNaW1lVHlwZXMsXG4gICAgLi4uRG9jdW1lbnRNaW1lVHlwZXMsXG4gICAgLi4uVGV4dE1pbWVUeXBlcyxcbiAgICAuLi5CaW5hcnlEb2NzTWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuICAgIC4uLkZvbnRNaW1lVHlwZXMsXG4gICAgLi4uT3RoZXJNaW1lVHlwZXMsXG5dO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBdWRpb01pbWVUeXBlcywgSW1hZ2VNaW1lVHlwZXMgfSBmcm9tICcuLi90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMnO1xuY29uc3QgU2luZ2xlRmlsZSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgcGF0aCwgbWltZVR5cGUsIHdpZHRoIH0gPSBwcm9wcztcbiAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgICAgICBpZiAobWltZVR5cGUgJiYgSW1hZ2VNaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHBhdGgsIHN0eWxlOiB7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9LCBhbHQ6IG5hbWUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIsIHsgY29udHJvbHM6IHRydWUsIHNyYzogcGF0aCB9LFxuICAgICAgICAgICAgICAgIFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlXCIsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCJhdWRpb1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJhY2tcIiwgeyBraW5kOiBcImNhcHRpb25zXCIgfSkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBhczogXCJhXCIsIGhyZWY6IHBhdGgsIG1sOiBcImRlZmF1bHRcIiwgc2l6ZTogXCJzbVwiLCByb3VuZGVkOiB0cnVlLCB0YXJnZXQ6IFwiX2JsYW5rXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiBcIkRvY3VtZW50RG93bmxvYWRcIiwgY29sb3I6IFwid2hpdGVcIiwgbXI6IFwiZGVmYXVsdFwiIH0pLFxuICAgICAgICAgICAgbmFtZSkpKTtcbn07XG5jb25zdCBGaWxlID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBsZXQgcGF0aCA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBuYW1lID0gZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5maWxlTmFtZVByb3BlcnR5ID8gY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgOiBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHlcbiAgICAgICAgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KTtcbiAgICBpZiAoIXByb3BlcnR5LmN1c3RvbS5tdWx0aXBsZSkge1xuICAgICAgICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgICAgICAgICAgcGF0aCA9IGAke2N1c3RvbS5vcHRzLmJhc2VVcmx9LyR7bmFtZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IHBhdGg6IHBhdGgsIG5hbWU6IG5hbWUsIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlIH0pKTtcbiAgICB9XG4gICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGN1c3RvbS5vcHRzLmJhc2VVcmwgfHwgJyc7XG4gICAgICAgIHBhdGggPSBwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IGAke2Jhc2VVcmx9LyR7bmFtZVtpbmRleF19YCk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IGtleTogc2luZ2xlUGF0aCwgcGF0aDogc2luZ2xlUGF0aCwgbmFtZTogbmFtZVtpbmRleF0sIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlW2luZGV4XSB9KSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRmlsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgTGlzdCA9IChwcm9wcykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogMTAwLCAuLi5wcm9wcyB9KSk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuIiwiaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgU2hvdyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgcHJvcGVydHkgfSA9IHByb3BzO1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGaWxlLCB7IHdpZHRoOiBcIjEwMCVcIiwgLi4ucHJvcHMgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaG93O1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgRmxvb3JFZGl0IGZyb20gJy4uL2FkbWluL2NvbXBvbmVudHMvRmxvb3JFZGl0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5GbG9vckVkaXQgPSBGbG9vckVkaXRcbmltcG9ydCBSYXRlTW9kZWxFZGl0IGZyb20gJy4uL2FkbWluL2NvbXBvbmVudHMvUmF0ZU1vZGVsRWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUmF0ZU1vZGVsRWRpdCA9IFJhdGVNb2RlbEVkaXRcbmltcG9ydCBHZXRMb2NhdGlvbiBmcm9tICcuLi9hZG1pbi9jb21wb25lbnRzL0dldExvY2F0aW9uJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5HZXRMb2NhdGlvbiA9IEdldExvY2F0aW9uXG5pbXBvcnQgVXBsb2FkRWRpdENvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkRWRpdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXBsb2FkRWRpdENvbXBvbmVudCA9IFVwbG9hZEVkaXRDb21wb25lbnRcbmltcG9ydCBVcGxvYWRMaXN0Q29tcG9uZW50IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRMaXN0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRMaXN0Q29tcG9uZW50ID0gVXBsb2FkTGlzdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZFNob3dDb21wb25lbnQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZFNob3dDb21wb25lbnQgPSBVcGxvYWRTaG93Q29tcG9uZW50Il0sIm5hbWVzIjpbImZsb29yVHlwZXMiLCJ2YWx1ZSIsImxhYmVsIiwiRmxvb3JzQ29tcG9uZW50Iiwib25DaGFuZ2UiLCJwcm9wZXJ0eSIsInJlY29yZCIsImNvbnNvbGUiLCJsb2ciLCJwYXJhbXMiLCJpbml0aWFsVmFsdWUiLCJuYW1lIiwibnVtYmVyT2ZGbG9vcnMiLCJmbG9vcnMiLCJudW1GbG9vcnMiLCJzZXROdW1GbG9vcnMiLCJ1c2VTdGF0ZSIsInNldEZsb29ycyIsInVzZUVmZmVjdCIsIm5ld0Zsb29ycyIsImkiLCJwdXNoIiwiY2xhc3NpZmljYXRpb24iLCJjYXJwZXRBcmVhQyIsImVtcHR5QXJlYUMiLCJjYXJwZXRBcmVhUiIsImVtcHR5QXJlYVIiLCJoYW5kbGVGbG9vckNoYW5nZSIsImluZGV4IiwiZmllbGQiLCJ1cGRhdGVkRmxvb3JzIiwiaGFuZGxlTnVtRmxvb3JzQ2hhbmdlIiwiZSIsIm5ld1ZhbCIsIk51bWJlciIsInRhcmdldCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJveCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwiSW5wdXQiLCJ0eXBlIiwibWluIiwid2lkdGgiLCJtYXAiLCJmbG9vciIsImtleSIsInZhcmlhbnQiLCJwYWRkaW5nIiwibWFyZ2luQm90dG9tIiwiYm9yZGVyUmFkaXVzIiwiZm9udFdlaWdodCIsIlNlbGVjdCIsIm9wdGlvbnMiLCJmaW5kIiwic2VsZWN0ZWQiLCJGcmFnbWVudCIsIlByb3BlcnR5VHlwZSIsIm90aGVyIiwib3RoZXJFc3RhYmxpc2htZW50Iiwic2VtaUdvdmVybm1lbnRPZmZpY2UiLCJyZXNpZGVuY2VBbmRDbGluaWMiLCJyZXNpZGVuY2VBbmRTaG9wIiwicmVzaWRlbmNlQW5kTWVkaWNhbFN0b3JlIiwiYnVpbGRpbmciLCJhdG0iLCJvZmZpY2UiLCJpbmR1c3RyaWFsVW5pdHMiLCJzcG9ydHNDZW50ZXIiLCJjbHViIiwid2VsZmFyZUhhbGwiLCJjbGluaWMiLCJmYWN0b3J5IiwiY29hY2hpbmdDZW50ZXIiLCJjb2FsRGVwb3QiLCJnYXJhZ2UiLCJnYXNXYXJlaG91c2VBZ2VuY3kiLCJ3YXJlaG91c2UiLCJjaW5lbWFIYWxsIiwiZm91clN0YXJBbmRBYm92ZUhvdGVscyIsImhvc3BpdGFsIiwiaG9zdGVsIiwiZ3ltIiwidHZUb3dlciIsInRvd2VyIiwiZGlhZ25vc3RpY0NlbnRlciIsInVwVG9UaHJlZVN0YXJIb3RlbHMiLCJ0aGVhdGVyIiwic2hvcCIsInRlbGVjb21Ub3dlciIsIm51cnNpbmdIb21lIiwicHJpdmF0ZUhvdGVsIiwicGV0cm9sUHVtcCIsInB1YnMiLCJsYWJvcmF0b3JpZXMiLCJwcml2YXRlTGltaXRlZENvbXBhbnkiLCJsaWJyYXJ5IiwicG9seWNsaW5pYyIsImZsYXQiLCJiYW5rIiwiYmFucXVldEhhbGwiLCJtdWx0aVN0b3JleUJ1aWxkaW5nIiwibXVsdGlTdG9yZXlDb21tZXJjaWFsRXN0YWJsaXNobWVudCIsImJhciIsInBsb3QiLCJtZWRpY2FsU3RvcmUiLCJtYXJyaWFnZUhvbWUiLCJtdWx0aXBsZXgiLCJtYWxscyIsInJlc2lkZW5jZSIsIm1hcnJpYWdlQ2x1YiIsImxpcXVvclNob3BCZWVyQmFyIiwicGh5c2ljYWxIZWFsdGhDZW50ZXJFdGMiLCJlZHVjYXRpb25hbEluc3RpdHV0aW9uIiwiZ292ZXJubWVudE9mZmljZSIsImdvdmVybm1lbnRCdWlsZGluZyIsImdvdmVybm1lbnRTY2hvb2wiLCJoZWFsdGhDYXJlQ2VudGVyIiwiaG90ZWwiLCJob3RlbEJhciIsImhvdGVsUmVzdGF1cmFudCIsImhvYXJkaW5nIiwiQ29uc3RydWN0aW9uVHlwZSIsInBlcm1hbmVudFdpdGhSY2NSYmNSb29mIiwicGVybWFuZW50V2l0aEFzYmVzdG9zRmliZXJUaW5TaGVkIiwidGVtcG9yYXJ5T3JPdGhlckJ1aWxkaW5nIiwiUm9hZFdpZHRoVHlwZSIsImxlc3NUaGFuOW0iLCJmcm9tOXRvMTJtIiwiZnJvbTEydG8yNG0iLCJtb3JlVGhhbjI0bSIsIk9iamVjdCIsImZyb21FbnRyaWVzIiwiZW50cmllcyIsImJ1aWxkT2plY3QiLCJmbGF0dGVuT2JqZWN0Iiwib2JqIiwic3RhcnRzV2l0aCIsInBhdGgiLCJzcGxpdCIsIlJhdGVNb2RlbEVkaXQiLCJwcm9wcyIsImhhbmRsZUNoYW5nZSIsIm5ld1ZhbHVlIiwic3R5bGUiLCJzdHlsZXMiLCJjb250YWluZXIiLCJoZWFkZXIiLCJmaWVsZHNDb250YWluZXIiLCJwbGFjZWhvbGRlciIsImlucHV0IiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwiZm9udFNpemUiLCJjb2xvciIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiZ2FwIiwiR2V0TG9jYXRpb24iLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImhhbmRsZUdldExvY2F0aW9uIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsImxhdCIsImNvb3JkcyIsImxvbiIsImVycm9yIiwiYWxlcnQiLCJtYXJnaW4iLCJtYXJnaW5Ub3AiLCJCdXR0b24iLCJvbkNsaWNrIiwidXNlVHJhbnNsYXRpb24iLCJEcm9wWm9uZSIsIkRyb3Bab25lSXRlbSIsIkljb24iLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJGbG9vckVkaXQiLCJVcGxvYWRFZGl0Q29tcG9uZW50IiwiVXBsb2FkTGlzdENvbXBvbmVudCIsIlVwbG9hZFNob3dDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFHQSxNQUFNQSxVQUFVLEdBQUcsQ0FDakI7RUFBRUMsRUFBQUEsS0FBSyxFQUFFLFlBQVk7RUFBRUMsRUFBQUEsS0FBSyxFQUFFO0VBQWEsQ0FBQyxFQUM1QztFQUFFRCxFQUFBQSxLQUFLLEVBQUUsYUFBYTtFQUFFQyxFQUFBQSxLQUFLLEVBQUU7RUFBYyxDQUFDLEVBQzlDO0VBQUVELEVBQUFBLEtBQUssRUFBRSxPQUFPO0VBQUVDLEVBQUFBLEtBQUssRUFBRTtFQUFRLENBQUMsQ0FDbkM7RUFFRCxTQUFTQyxlQUFlQSxDQUFDO0lBQUVDLFFBQVE7SUFBRUMsUUFBUTtFQUFFQyxFQUFBQTtFQUFPLENBQUMsRUFBRTtJQUV2REMsT0FBTyxDQUFDQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUdGLE1BQU0sQ0FBQ0csTUFBTSxDQUFDO0lBRTdELE1BQU1DLFlBQVksR0FBR0osTUFBTSxDQUFDRyxNQUFNLENBQUNKLFFBQVEsQ0FBQ00sSUFBSSxDQUFDLElBQUk7RUFDbkRDLElBQUFBLGNBQWMsRUFBRSxDQUFDO0VBQ2pCQyxJ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
