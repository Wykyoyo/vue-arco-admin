import { initAmapUIScript } from './gaode_map'

// eslint-disable-next-line import/prefer-default-export
export const getGeoJson = (adcode: number, childAdcode?: number) => {
  return new Promise((resolve, reject) => {
    initAmapUIScript().then(() => {
      // eslint-disable-next-line no-shadow
      const insideFun = (adcode: number, childAdcode?: number) => {
        AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer: any) => {
          const districtExplorer = new DistrictExplorer()
          districtExplorer.loadAreaNode(adcode, (error: any, areaNode: any) => {
            if (error) {
              reject(error)
              return
            }
            let Json = areaNode.getSubFeatures()
            if (Json.length === 0) {
              // eslint-disable-next-line no-underscore-dangle
              const parent = areaNode._data.geoData.parent.properties.acroutes
              insideFun(parent[parent.length - 1], adcode)
              return
            }

            if (childAdcode) {
              Json = Json.filter((item: any) => {
                return item.properties.adcode === childAdcode
              })
            }
            const mapJson = {
              features: Json
            }
            resolve(mapJson)
          })
        })
      }
      insideFun(adcode, childAdcode)
    })
  })
}
