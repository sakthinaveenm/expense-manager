import { Platform } from "react-native"

const DefaultComponent = Platform.select({
  ios : require("./Dashboard").default,
  Android : require("./Dashboard").default,
  windows : require("./Dashboard").default
})

export default DefaultComponent;