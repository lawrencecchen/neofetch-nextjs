export interface DeviceInfo {
  image: string;
  label: string;
}

export function getDevice(hostModel: string): DeviceInfo {
  const h = hostModel.toLowerCase();

  // MacBook Neo
  if (h.includes("macbookneo") || h.includes("macbook neo")) {
    return { image: "/devices/macbook-neo.jpg", label: "MacBook Neo" };
  }

  // MacBook Pro 16"
  if (
    h.includes("macbookpro18") || // M1 Pro/Max 16"
    h.includes("macbookpro16") || // Intel 16"
    h.includes("mac15,7") ||
    h.includes("mac15,9") ||
    h.includes("mac15,11") ||
    h.includes("mac16,1") ||
    h.includes("mac16,5") ||
    h.includes("mac16,7")
  ) {
    return { image: "/devices/macbook-pro-16.jpg", label: 'MacBook Pro 16"' };
  }

  // MacBook Pro 14" / generic MacBook Pro
  if (h.includes("macbookpro") || h.includes("macbook pro")) {
    return { image: "/devices/macbook-pro-14.jpg", label: 'MacBook Pro 14"' };
  }

  // MacBook Air 15"
  if (h.includes("mac15,13") || h.includes("mac16,12")) {
    return { image: "/devices/macbook-air-15.jpg", label: 'MacBook Air 15"' };
  }

  // MacBook Air 13" / generic
  if (h.includes("macbookair") || h.includes("macbook air")) {
    return { image: "/devices/macbook-air-13.jpg", label: 'MacBook Air 13"' };
  }

  // Mac mini
  if (h.includes("macmini") || h.includes("mac mini") || h.includes("mac16,10") || h.includes("mac16,11")) {
    return { image: "/devices/mac-mini.jpg", label: "Mac mini" };
  }

  // Mac Studio
  if (h.includes("macstudio") || h.includes("mac studio") || h.includes("mac13,1") || h.includes("mac13,2") || h.includes("mac14,13") || h.includes("mac14,14")) {
    return { image: "/devices/mac-studio.jpg", label: "Mac Studio" };
  }

  // iMac
  if (h.includes("imac")) {
    return { image: "/devices/imac.jpg", label: "iMac" };
  }

  // Mac Pro
  if (h.includes("macpro") || h.includes("mac pro")) {
    return { image: "/devices/mac-pro.jpg", label: "Mac Pro" };
  }

  // Fallback
  return { image: "/devices/macbook-pro.jpg", label: "Mac" };
}
