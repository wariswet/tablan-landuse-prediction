import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Highcharts from "highcharts";
import "./stlye.css" // แก้คำผิด stlye.css เป็น style.css

// 1. ตั้งค่าแผนที่
var map = L.map("map", {
    center: [18.80599, 98.95043],
    zoom: 12
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 2. เตรียม Object เก็บ Layer ของแต่ละปี (สมมติว่าดึงมาจาก GeoServer)
// คุณต้องเอาผลลัพธ์จาก MOLUSCE แต่ละปี ไปขึ้น GeoServer ทีละ Layer
var landUseLayers = {
    "2558": L.tileLayer.wms('http://localhost:8080/geoserver/wms', { layers: 'workspace:lu_2558', format: 'image/png', transparent: true }),
    "2560": L.tileLayer.wms('http://localhost:8080/geoserver/wms', { layers: 'workspace:lu_2560', format: 'image/png', transparent: true }),
    "2562": L.tileLayer.wms('http://localhost:8080/geoserver/wms', { layers: 'workspace:lu_2562_sim', format: 'image/png', transparent: true }),
    "2564": L.tileLayer.wms('http://localhost:8080/geoserver/wms', { layers: 'workspace:lu_2564_sim', format: 'image/png', transparent: true }),
    "2566": L.tileLayer.wms('http://localhost:8080/geoserver/wms', { layers: 'workspace:lu_2566_sim', format: 'image/png', transparent: true }),
    "2568": L.tileLayer.wms('http://localhost:8080/geoserver/wms', { layers: 'workspace:lu_2568_sim', format: 'image/png', transparent: true })
};

// ตัวแปรเก็บ Layer ปัจจุบันที่เปิดอยู่
var currentLayer = landUseLayers["2558"];
currentLayer.addTo(map); // แสดงปี 2558 เป็นค่าเริ่มต้น

// 3. ฟังก์ชันดักจับการเปลี่ยนค่าของ Dropdown เลือกปี
document.getElementById('yearSelect').addEventListener('change', function (e) {
    var selectedYear = e.target.value;

    // ลบ Layer เก่าออก
    map.removeLayer(currentLayer);

    // เอา Layer ของปีที่เลือกมาใส่แทน
    currentLayer = landUseLayers[selectedYear];
    currentLayer.addTo(map);
});

// 4. ฟังก์ชันสร้างกราฟเส้น (Line Chart) แสดงแนวโน้มทุกปี
function showTrendChart() {
    Highcharts.chart('chart', {
        chart: { type: 'line' },
        title: { text: 'แนวโน้มการเปลี่ยนแปลงการใช้ประโยชน์ที่ดิน (พ.ศ. 2558 - 2568)' },
        xAxis: {
            categories: ['2558', '2560', '2562 (คาดการณ์)', '2564 (คาดการณ์)', '2566 (คาดการณ์)', '2568 (คาดการณ์)']
        },
        yAxis: {
            title: { text: 'พื้นที่ (ตารางกิโลเมตร)' }
        },
        tooltip: { shared: true },
        // ผู้ใช้สามารถคลิกที่ชื่อใน Legend ของกราฟ เพื่อเปิด/ปิด ดูเฉพาะป่าไม้ หรือเกษตรได้เลย!
        series: [
            {
                name: 'ป่าไม้',
                color: '#2ca02c',
                data: [350, 320, 290, 270, 250, 230] // ใส่ข้อมูลจริง/คาดการณ์ของคุณ
            },
            {
                name: 'เกษตรกรรม',
                color: '#ff7f0e',
                data: [150, 170, 180, 185, 190, 195]
            },
            {
                name: 'ที่อยู่อาศัย',
                color: '#d62728',
                data: [50, 60, 80, 95, 110, 125]
            }
        ]
    });
}

// เรียกแสดงกราฟ
showTrendChart();