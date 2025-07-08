// Layer configurations for Air Quality WebGIS
const GEOSERVER_CONFIG = {
  URL: "https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_11/wms",
  WFS_URL: "https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_11/wfs",
  USERNAME: "gisgeoserver_11",
  PASSWORD: "YhU68K3sXQ",
  WORKSPACE: "gisgeoserver_11",
}

// PM10 WMS Layers Configuration
const PM10_WMS_LAYERS = [
  {
    id: "pm10_wms_1",
    name: "Slovenia_CAMS_pm10_2022_12",
    layerName: "Slovenia_CAMS_pm10_2022_12",
    visible: true,
    opacity: 0.7,
    color: "#ff0000",
  },
  {
    id: "pm10_wms_2",
    name: "Slovenia_average_pm10_2022",
    layerName: "Slovenia_average_pm10_2022",
    visible: false,
    opacity: 0.7,
    color: "#ff4444",
  },
  {
    id: "pm10_wms_3",
    name: "Slovenia_pm10_concentration_map_2020",
    layerName: "Slovenia_pm10_concentration_map_2020",
    visible: false,
    opacity: 0.7,
    color: "#ff6666",
  },
  {
    id: "pm10_wms_4",
    name: "Slovenia_pm10_2017-2021_AAD_map_2022",
    layerName: "Slovenia_pm10_2017-2021_AAD_map_2022",
    visible: false,
    opacity: 0.7,
    color: "#ff8888",
  },
  {
    id: "pm10_wms_5",
    name: "Slovenia_LC_reclassified_2022_pm10",
    layerName: "Slovenia_LC_reclassified_2022_pm10",
    visible: false,
    opacity: 0.7,
    color: "#ffaaaa",
  },
  {
    id: "pm10_wms_6",
    name: "Slovenia_pm10_2020_bivariate",
    layerName: "Slovenia_pm10_2020_bivariate",
    visible: false,
    opacity: 0.7,
    color: "#cc6666",
  },
]

// PM2.5 WMS Layers Configuration
const PM25_WMS_LAYERS = [
  {
    id: "pm2p5_wms_1",
    name: "Slovenia_CAMS_pm2p5_2022_12",
    layerName: "Slovenia_CAMS_pm2p5_2022_12",
    visible: false,
    opacity: 0.7,
    color: "#0000ff",
  },
  {
    id: "pm2p5_wms_2",
    name: "Slovenia_average_pm2p5_2022",
    layerName: "Slovenia_average_pm2p5_2022",
    visible: false,
    opacity: 0.7,
    color: "#4444ff",
  },
  {
    id: "pm2p5_wms_3",
    name: "Slovenia_pm2p5_concentration_map_2020",
    layerName: "Slovenia_pm2p5_concentration_map_2020",
    visible: false,
    opacity: 0.7,
    color: "#6666ff",
  },
  {
    id: "pm2p5_wms_4",
    name: "Slovenia_pm2p5_2017-2021_AAD_map_2022",
    layerName: "Slovenia_pm2p5_2017-2021_AAD_map_2022",
    visible: false,
    opacity: 0.7,
    color: "#8888ff",
  },
  {
    id: "pm2p5_wms_5",
    name: "Slovenia_LC_reclassified_2022_pm2p5",
    layerName: "Slovenia_LC_reclassified_2022_pm2p5",
    visible: false,
    opacity: 0.7,
    color: "#aaaaff",
  },
  {
    id: "pm2p5_wms_6",
    name: "Slovenia_pm2p5_2020_bivariate",
    layerName: "Slovenia_pm2p5_2020_bivariate",
    visible: false,
    opacity: 0.7,
    color: "#6666cc",
  },
]

// Function to create WMS layer
function createWMSLayer(config) {
  const ol = window.ol
  return new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: GEOSERVER_CONFIG.URL,
      params: {
        LAYERS: GEOSERVER_CONFIG.WORKSPACE + ":" + config.layerName,
        FORMAT: "image/png",
        TRANSPARENT: true,
        VERSION: "1.1.0",
        SRS: "EPSG:4326",
        username: GEOSERVER_CONFIG.USERNAME,
        password: GEOSERVER_CONFIG.PASSWORD,
      },
      serverType: "geoserver",
      crossOrigin: "anonymous",
    }),
    visible: config.visible,
    opacity: config.opacity,
    title: config.name,
    id: config.id,
  })
}

// Function to get WMS legend
function getWMSLegend(config) {
  const legendUrl = GEOSERVER_CONFIG.URL +
    "?REQUEST=GetLegendGraphic" +
    "&VERSION=1.0.0" +
    "&FORMAT=image/png" +
    "&LAYER=" + GEOSERVER_CONFIG.WORKSPACE + ":" + config.layerName +
    "&username=" + GEOSERVER_CONFIG.USERNAME +
    "&password=" + GEOSERVER_CONFIG.PASSWORD

  return legendUrl
}

// Function to display layer legend
function displayLayerLegend(layerId) {
  const layerConfig = [...PM10_WMS_LAYERS, ...PM25_WMS_LAYERS].find(layer => layer.id === layerId)
  
  if (layerConfig) {
    const legendUrl = getWMSLegend(layerConfig)
    const legendContainer = document.getElementById('layer-legend-container')
    
    if (legendContainer) {
      legendContainer.innerHTML = `
        <div class="legend-item p-4 bg-white rounded-lg shadow-lg border">
          <h4 class="font-bold mb-2">${layerConfig.name}</h4>
          <img src="${legendUrl}" alt="Legend for ${layerConfig.name}" 
               onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
          <div style="display:none;" class="text-sm text-gray-600">
            Legend not available
          </div>
        </div>
      `
    }
  }
}

// Legend toggle functionality
document.getElementById('toggle-legend').addEventListener('click', function () {
  const legend = document.getElementById('floating-legend');
  legend.classList.toggle('hidden');
});
