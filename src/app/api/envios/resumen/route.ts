import { NextResponse } from "next/server";
export async function GET() {
  try {
    const resumen = {
      ac: 321,  
      wa: 54,   
      tle: 21,  
      mle: 4,   
      ce: 5,    
      re: 7,    
    };
    return NextResponse.json(resumen);
  } catch (error) {
    console.error("Error al obtener el resumen:", error);
    return NextResponse.json(
      { error: "No se pudo obtener el resumen" },
      { status: 500 }
    );
  }
}
