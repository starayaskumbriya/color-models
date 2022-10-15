//RGB XYZ LAB

let firstValue = "";
let secondValue = "";
let index = "";
function firstChange() {
    firstValue = document.getElementById('fcid').options[document.getElementById('fcid').selectedIndex].value;
    secondValue = document.getElementById('scid').options[document.getElementById('scid').selectedIndex].value;
    //index = firstValue + secondValue
    
    if(firstValue === "RGB") {
        document.getElementById("11").placeholder="R: "; 
        document.getElementById("12").placeholder="G: ";
        document.getElementById("13").placeholder="B: "; 
        document.getElementById("11").value=""; 
        document.getElementById("12").value="";
        document.getElementById("13").value=""; 
    }
    
    if(firstValue === "XYZ") {
        document.getElementById("11").placeholder="X: "; 
        document.getElementById("12").placeholder="Y: ";
        document.getElementById("13").placeholder="Z: "; 
        document.getElementById("11").value=""; 
        document.getElementById("12").value="";
        document.getElementById("13").value=""; 
    }
    
    if(firstValue === "Lab") {
        document.getElementById("11").placeholder="L: "; 
        document.getElementById("12").placeholder="a: ";
        document.getElementById("13").placeholder="b: "; 
        document.getElementById("11").value=""; 
        document.getElementById("12").value="";
        document.getElementById("13").value=""; 
    }

    if(secondValue === "RGB") {
        document.getElementById("21").placeholder="R: "; 
        document.getElementById("22").placeholder="G: ";
        document.getElementById("23").placeholder="B: "; 
        document.getElementById("21").value=""; 
        document.getElementById("22").value="";
        document.getElementById("23").value=""; 
    }

    if(secondValue === "XYZ") {
        document.getElementById("21").placeholder="X: "; 
        document.getElementById("22").placeholder="Y: ";
        document.getElementById("23").placeholder="Z: "; 
        document.getElementById("21").value=""; 
        document.getElementById("22").value="";
        document.getElementById("23").value="";
    }

    if(secondValue === "Lab") {
        document.getElementById("21").placeholder="L: "; 
        document.getElementById("22").placeholder="a: ";
        document.getElementById("23").placeholder="b: ";
        document.getElementById("21").value=""; 
        document.getElementById("22").value="";
        document.getElementById("23").value=""; 
    }
}
firstChange();


function RGBtoXYZ(R, G, B) {

    let matrix = [[0.4124108464885388, 0.3575845678529519, 0.18045380393360833],
                  [0.21264934272065283, 0.7151691357059038, 0.07218152157344333],
                  [0.019331758429150258, 0.11919485595098397, 0.9503900340503373]];
    let r = 0, g = 0, b = 0;

    if((R / 255) > 0.04045) r = Math.pow((((R / 255) + 0.055) / 1.055), 2.4);
    else r = (R / 255) / 12.92;

    if((G / 255) > 0.04045) g = Math.pow((((G / 255) + 0.055) / 1.055), 2.4);
    else g = (G / 255) / 12.92;

    if((B / 255) > 0.04045) b = Math.pow((((B / 255) + 0.055) / 1.055), 2.4);
    else b = (B / 255) / 12.92;

    let X = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
    let Y = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
    let Z = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];

    if(firstValue === "RGB" && secondValue === "XYZ") { //тут нет решения(глючит RGB)
        document.getElementById("21").value = X * 100;
        document.getElementById("22").value = Y * 100;
        document.getElementById("23").value = Z * 100;

        let rr = parseInt(document.getElementById('11').value);
        let gg = parseInt(document.getElementById('12').value);
        let bb = parseInt(document.getElementById('13').value);
        document.getElementById("moiCvet").style.backgroundColor= "rgb("+rr+","+gg+","+bb+")";
        // document.getElementById("prosti").style.backgroundImage= 'url("/Users/Asus/Desktop/collor/w.jpg")';
        
        
    }
    
}
document.getElementById("13").addEventListener('blur', function valuee() {
    RGBtoXYZ(parseInt(document.getElementById("11").value), parseInt(document.getElementById("12").value), parseInt(document.getElementById("13").value));
});


function XYZtoRGB(X, Y, Z) {
    let matrix = [[3.240812398895283, -1.5373084456298136, -0.4985865229069666],
                  [-0.9692430170086407, 1.8759663029085742, 0.04155503085668564],
                  [0.055638398436112804, -0.20400746093241362, 1.0571295702861434]];
    let R = 0, G = 0, B = 0;              

    let r = (X * matrix[0][0] + Y * matrix[0][1] + Z * matrix[0][2]) / 100; 
    let g = (X * matrix[1][0] + Y * matrix[1][1] + Z * matrix[1][2]) / 100; 
    let b = (X * matrix[2][0] + Y * matrix[2][1] + Z * matrix[2][2]) / 100;            

    if(r > 0.0031308) R = (1.055 * Math.pow(r, (1 / 2.4)) - 0.055) * 255;
    else R = r * 12.92 * 255;

    if(g > 0.0031308) G = (1.055 * Math.pow(g, (1 / 2.4)) - 0.055) * 255;
    else G = g * 12.92 * 255;

    if(b > 0.0031308) B = (1.055 * Math.pow(b, (1 / 2.4)) - 0.055) * 255;
    else B = b * 12.92 * 255;

    if(firstValue === "XYZ" && secondValue === "RGB") {   //тут нет решения(глючит RGB)
        document.getElementById("21").value = R;
        document.getElementById("22").value = G;
        document.getElementById("23").value = B;
        
        document.getElementById("moiCvet").style.backgroundColor= "rgb("+R+","+G+","+B+")";
    }
}
document.getElementById("13").addEventListener('blur', function valuee() {
    XYZtoRGB(parseInt(document.getElementById("11").value), parseInt(document.getElementById("12").value), parseInt(document.getElementById("13").value));
});



function XYZtoLAB(X, Y, Z) {
    let Xn = 95.0489, Yn = 100, Zn = 108.884;
    let L = 0, a = 0, b = 0, fX = 0, fY = 0, fZ = 0;
    
    if ((Y / Yn) > Math.pow((6 / 29), 3)) fY = Math.pow((Y / Yn), 1/3);
    else fY = (Y / Yn) / (3 * Math.pow((6 / 29), 2)) + 4 / 29;
        
    if ((X / Xn) > Math.pow((6 / 29), 3)) fX = Math.pow((X / Xn), 1/3);
    else fX = (X / Xn) / (3 * Math.pow((6 / 29), 2)) + 4 / 29;

    if ((Z / Zn) > Math.pow((6 / 29), 3)) fZ = Math.pow((Z / Zn), 1/3);
    else fZ = (Z / Zn) / (3 * Math.pow((6 / 29), 2)) + 4 / 29;
        
    L = 116 * fY - 16;
    a = 500 * (fX - fY);
    b = 200 * (fY - fZ);

    if(firstValue === "XYZ" && secondValue === "Lab") { 
        document.getElementById("21").value = L;
        document.getElementById("22").value = a;
        document.getElementById("23").value = b;

        document.getElementById("11").value = X;
        document.getElementById("12").value = Y;
        document.getElementById("13").value = Z;

        let matrix = [[3.240812398895283, -1.5373084456298136, -0.4985865229069666],
                      [-0.9692430170086407, 1.8759663029085742, 0.04155503085668564],
                      [0.055638398436112804, -0.20400746093241362, 1.0571295702861434]];
        let R = 0, G = 0, B = 0;              

        let r = (X * matrix[0][0] + Y * matrix[0][1] + Z * matrix[0][2]) / 100; 
        let g = (X * matrix[1][0] + Y * matrix[1][1] + Z * matrix[1][2]) / 100; 
        let bb = (X * matrix[2][0] + Y * matrix[2][1] + Z * matrix[2][2]) / 100;            

        if(r > 0.0031308) R = (1.055 * Math.pow(r, (1 / 2.4)) - 0.055) * 255;
        else R = r * 12.92 * 255;

        if(g > 0.0031308) G = (1.055 * Math.pow(g, (1 / 2.4)) - 0.055) * 255;
        else G = g * 12.92 * 255;

        if(bb > 0.0031308) B = (1.055 * Math.pow(bb, (1 / 2.4)) - 0.055) * 255;
        else B = bb * 12.92 * 255;

        document.getElementById("moiCvet").style.backgroundColor= "rgb("+R+","+G+","+B+")";
    }
}
document.getElementById("13").addEventListener('blur', function valuee() {
    XYZtoLAB(parseInt(document.getElementById("11").value), parseInt(document.getElementById("12").value), parseInt(document.getElementById("13").value));
});



function LABtoXYZ(L, a, b) {
    let Xn = 95.0489, Yn = 100, Zn = 108.884;
    let X = 0, Y = 0, Z = 0, fY = 0, fX = 0, fZ = 0;
    
    fY = (L + 16) / 116;
    fX = fY + a / 500;
    fZ = fY - b / 200;

    if(fY > (6 / 29)) Y = (Yn * Math.pow(fY, 3));
    else Y = ((fY - 16 / 116) * 3 * Math.pow((6 / 29), 2) * Yn);

    if(fX > (6 / 29)) X = (Xn * Math.pow(fX, 3));
    else X = ((fX - 16 / 116) * 3 * Math.pow((6 / 29), 2) * Xn);

    if(fZ > (6 / 29)) Z = (Zn * Math.pow(fZ, 3));
    else Z = ((fZ - 16 / 116) * 3 * Math.pow((6 / 29), 2) * Zn);

    if(firstValue === "Lab" && secondValue === "XYZ") { 
        document.getElementById("21").value = X;
        document.getElementById("22").value = Y;
        document.getElementById("23").value = Z;

        let matrix = [[3.240812398895283, -1.5373084456298136, -0.4985865229069666],
                      [-0.9692430170086407, 1.8759663029085742, 0.04155503085668564],
                      [0.055638398436112804, -0.20400746093241362, 1.0571295702861434]];
        let R = 0, G = 0, B = 0;              

        let r = (X * matrix[0][0] + Y * matrix[0][1] + Z * matrix[0][2]) / 100; 
        let g = (X * matrix[1][0] + Y * matrix[1][1] + Z * matrix[1][2]) / 100; 
        let b = (X * matrix[2][0] + Y * matrix[2][1] + Z * matrix[2][2]) / 100;            

        if(r > 0.0031308) R = (1.055 * Math.pow(r, (1 / 2.4)) - 0.055) * 255;
        else R = r * 12.92 * 255;

        if(g > 0.0031308) G = (1.055 * Math.pow(g, (1 / 2.4)) - 0.055) * 255;
        else G = g * 12.92 * 255;

        if(b > 0.0031308) B = (1.055 * Math.pow(b, (1 / 2.4)) - 0.055) * 255;
        else B = b * 12.92 * 255;
        document.getElementById("moiCvet").style.backgroundColor= "rgb("+R+","+G+","+B+")";
    }
}
document.getElementById("13").addEventListener('blur', function valuee() {
    LABtoXYZ(parseInt(document.getElementById("11").value), parseInt(document.getElementById("12").value), parseInt(document.getElementById("13").value));
});




function LABtoRGB(L, a, b) {
    
    let Xn = 95.0489, Yn = 100, Zn = 108.884;
    let X = 0, Y = 0, Z = 0;

    fY = (L + 16) / 116;
    fX = fY + a / 500;
    fZ = fY - b / 200;

    if(fY > (6 / 29)) Y = Yn * Math.pow(fY, 3);
    else Y = (fY - 16 / 116) * 3 * Math.pow((6 / 29), 2) * Yn;

    if(fX > (6 / 29)) X = Xn * Math.pow(fX, 3);
    else X = (fX - 16 / 116) * 3 * Math.pow((6 / 29), 2) * Xn;

    if(fZ > (6 / 29)) Z = Zn * Math.pow(fZ, 3);
    else Z = (fZ - 16 / 116) * 3 * Math.pow((6 / 29), 2) * Zn;
    

    
    
    let matrix = [[3.240812398895283, -1.5373084456298136, -0.4985865229069666],
                  [-0.9692430170086407, 1.8759663029085742, 0.04155503085668564],
                  [0.055638398436112804, -0.20400746093241362, 1.0571295702861434]];
    let R = 0, G = 0, B = 0;              

    let r = (X / 100) * matrix[0][0] + (Y / 100) * matrix[0][1] + (Z / 100) * matrix[0][2]; 
    let g = (X / 100) * matrix[1][0] + (Y / 100) * matrix[1][1] + (Z / 100) * matrix[1][2]; 
    let bb = (X / 100) * matrix[2][0] + (Y / 100) * matrix[2][1] + (Z / 100) * matrix[2][2];            

    if(r > 0.0031308) R = (1.055 * Math.pow(r, (1 / 2.4)) - 0.055) * 255;
    else R = r * 12.92 * 255;

    if(g > 0.0031308) G = (1.055 * Math.pow(g, (1 / 2.4)) - 0.055) * 255;
    else G = g * 12.92 * 255;

    if(bb > 0.0031308) B = (1.055 * Math.pow(bb, (1 / 2.4)) - 0.055) * 255;
    else B = bb * 12.92 * 255;


    if(firstValue === "Lab" && secondValue === "RGB") { 
        document.getElementById("21").value = R;
        document.getElementById("22").value = G;
        document.getElementById("23").value = B;
        //
        document.getElementById("moiCvet").style.backgroundColor= "rgb("+R+","+G+","+B+")";
    }
}
document.getElementById("13").addEventListener('blur', function valuee() {
    LABtoRGB(parseInt(document.getElementById("11").value), parseInt(document.getElementById("12").value), parseInt(document.getElementById("13").value));
});



function RGBtoLAB(R, G, B) {

    let matrix = [[0.4124108464885388, 0.3575845678529519, 0.18045380393360833],
                  [0.21264934272065283, 0.7151691357059038, 0.07218152157344333],
                  [0.019331758429150258, 0.11919485595098397, 0.9503900340503373]];
    let r = 0, g = 0, bb = 0;

    if((R / 255) > 0.04045) r = Math.pow((((R / 255) + 0.055) / 1.055), 2.4);
    else r = (R / 255) / 12.92;

    if((G / 255) > 0.04045) g = Math.pow((((G / 255) + 0.055) / 1.055), 2.4);
    else g = (G / 255) / 12.92;

    if((B / 255) > 0.04045) bb = Math.pow((((B / 255) + 0.055) / 1.055), 2.4);
    else bb = (B / 255) / 12.92;

    let X = (r * matrix[0][0] + g * matrix[0][1] + bb * matrix[0][2]) * 100;
    let Y = (r * matrix[1][0] + g * matrix[1][1] + bb * matrix[1][2]) * 100;
    let Z = (r * matrix[2][0] + g * matrix[2][1] + bb * matrix[2][2]) * 100;


    let Xn = 95.0489, Yn = 100, Zn = 108.884;
    let L = 0, a = 0, b = 0, fX = 0, fY = 0, fZ = 0;
    
    if ((Y / Yn) > Math.pow((6 / 29), 3)) fY = Math.pow((Y / Yn), 1/3);
    else fY = (Y / Yn) / (3 * Math.pow((6 / 29), 2)) + 4 / 29;
        
    if ((X / Xn) > Math.pow((6 / 29), 3)) fX = Math.pow((X / Xn), 1/3);
    else fX = (X / Xn) / (3 * Math.pow((6 / 29), 2)) + 4 / 29;

    if ((Z / Zn) > Math.pow((6 / 29), 3)) fZ = Math.pow((Z / Zn), 1/3);
    else fZ = (Z / Zn) / (3 * Math.pow((6 / 29), 2)) + 4 / 29;
        
    L = 116 * fY - 16;
    a = 500 * (fX - fY);
    b = 200 * (fY - fZ);

    if(firstValue === "RGB" && secondValue === "Lab") { 
        document.getElementById("21").value = L;
        document.getElementById("22").value = a;
        document.getElementById("23").value = b;
        let rr = parseInt(document.getElementById('11').value);
        let gg = parseInt(document.getElementById('12').value);
        let bb = parseInt(document.getElementById('13').value);
        document.getElementById("moiCvet").style.backgroundColor= "rgb("+rr+","+gg+","+bb+")";
    }
}
document.getElementById("13").addEventListener('blur', function valuee() {
    RGBtoLAB(parseInt(document.getElementById("11").value), parseInt(document.getElementById("12").value), parseInt(document.getElementById("13").value));
});



