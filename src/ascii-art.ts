// ASCII art for different Apple devices / generic macOS

export const appleLogoArt = `
                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.`;

export const macBookProArt = `
          .--.--.--.--.--.--.--.
         |                      |
         |   .--.--.--.--.--.   |
         |   |              |   |
         |   |              |   |
         |   |              |   |
         |   |   MacBook    |   |
         |   |     Pro      |   |
         |   |              |   |
         |   |              |   |
         |   |              |   |
         |   '--'--'--'--'--'   |
         |         ____         |
         '------./    \\.------'
        /________________________\\
       /                          \\
      '----.----.----.----.----.---'`;

export const macMiniArt = `
      .-------------------------.
     /                           \\
    /     ___________________     \\
   |     |                   |     |
   |     |     Mac mini      |     |
   |     |___________________|     |
    \\                             /
     \\           (●)             /
      '-------------------------'
       \\_______________________/
        \\_____________________/`;

export const macStudioArt = `
      .-------------------------.
     /                           \\
    /     ___________________     \\
   |     |                   |     |
   |     |    Mac Studio     |     |
   |     |___________________|     |
   |                               |
   |     ___________________       |
   |     |   :::::::::::   |       |
   |     |_________________|       |
    \\                             /
     '-------------------------'`;

export const iMacArt = `
      .-------------------------.
     |                           |
     |                           |
     |                           |
     |          iMac             |
     |                           |
     |                           |
     |                           |
     |                           |
     |           ____            |
     '----------/    \\----------'
               /      \\
              /________\\
             /____  ____\\`;

export const macProArt = `
      .--------------------.
     /   () () () () () ()  \\
    /   () () () () () ()    \\
   |   () () () () () ()      |
   |   () () () () () ()      |
   |                          |
   |        Mac Pro           |
   |                          |
   |   () () () () () ()      |
   |   () () () () () ()      |
   '----.----.----.----.------'
        |              |
        '--------------'`;

export function getAsciiArt(hostModel: string): { art: string; label: string } {
  const h = hostModel.toLowerCase();

  if (h.includes("macbookpro") || h.includes("macbook pro") || h.includes("macbookpro")) {
    return { art: macBookProArt, label: "MacBook Pro" };
  }
  if (h.includes("macbookair") || h.includes("macbook air")) {
    return { art: macBookProArt, label: "MacBook Air" }; // similar form factor
  }
  if (h.includes("macmini") || h.includes("mac mini") || h.includes("mac14,3") || h.includes("mac14,12")) {
    return { art: macMiniArt, label: "Mac mini" };
  }
  if (h.includes("macstudio") || h.includes("mac studio") || h.includes("mac13,1") || h.includes("mac13,2")) {
    return { art: macStudioArt, label: "Mac Studio" };
  }
  if (h.includes("imac")) {
    return { art: iMacArt, label: "iMac" };
  }
  if (h.includes("macpro") || h.includes("mac pro")) {
    return { art: macProArt, label: "Mac Pro" };
  }

  // Default: Apple logo
  return { art: appleLogoArt, label: "Apple" };
}
