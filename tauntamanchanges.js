var collection = ee.ImageCollection('LANDSAT/LT5_L1T_TOA')
var summer = ee.Filter.dayOfYear(90,120);
var summerImages = ee.ImageCollection(collection)
.filter(summer)
.filterMetadata('WRS_PATH','equals',133)
.filterMetadata('WRS_ROW','equals',45)
.filterMetadata('CLOUD_COVER', 'less_than', 30)
.select(['B5','B4','B3'])
.map(function(image){ return image.multiply(512).uint8();});

Map.addLayer(summerImages);

Map.centerObject(geometry,10);
print(summerImages);
Export.video.toDrive({
collection: summerImages,
description:"TaunTaManInnChanges",
folder:"MapVideos",
fileNamePrefix:"TaunTaManInn-001",
framesPerSecond:3,
dimensions:720,
region:geometry
});
