<template>
 <!-- Content Wrapper. Contains page content -->
 <div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <div class="content-header">
     <div class="container-fluid">
     </div><!-- /.container-fluid -->
   </div>
   <!-- /.content-header -->

   <!-- Main content -->
   <section class="content">
     <div class="container-fluid">
       <!-- Small boxes (Stat box) -->
       <div class="row"></div>
       <!-- /.row -->
       <!-- Main row -->
       <div class="row">
          <div class="col-12">
            <!-- interactive chart -->
            <div class="card card-primary card-outline">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="far fa-chart-bar"></i>
                  Kondisi Saat Ini
                </h3>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label>Pilih Kolam</label>
                  <select class="form-control" @change="getProduksi">
                    <option value="" disabled selected>Silakan Pilih</option>
                    <option v-for="kolam in kolam.data" :key="kolam.id" v-bind:value="kolam.id">{{kolam.nama_kolam}}</option>
                    <!--<option value="3  ">Operator</option>-->
                  </select>
                </div>
                <div class="form-group" v-if="isHidden === false">
                  <label>Pilih Produksi</label>
                  <select class="form-control" @change="getOutput">
                    <option value="" disabled selected>Silakan Pilih</option>
                    <option v-for="prod in prod" :key="prod.id" v-bind:value="prod.id">Produksi {{prod.id}}</option>
                    <!--<option value="3  ">Operator</option>-->
                  </select>
                </div>
                <ul class="nav nav-tabs" id="custom-content-below-tab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="custom-content-below-realtime-tab" data-toggle="pill" href="#realtime" role="tab" aria-controls="custom-content-below-realtime" aria-selected="true">Data Realtime</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="custom-content-below-grafik-tab" data-toggle="pill" href="#grafik" role="tab" aria-controls="custom-content-below-grafik" aria-selected="false">Grafik</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="custom-content-below-lokasi-tab" data-toggle="pill" href="#lokasi" role="tab" aria-controls="custom-content-below-lokasi" aria-selected="false">Lokasi</a>
                  </li>
                </ul>
                <div class="tab-content" id="custom-content-below-tabContent">
                  <div class="tab-pane fade show active" id="realtime" role="tabpanel" aria-labelledby="custom-content-below-reatime-tab">
                    <br/>
                    <div class="row">
                      <div class="col-lg-3 col-6">
                      <!-- small box -->
                        <div class="small-box bg-info">
                          <div class="inner">
                            <h3>{{suhu_air}} °C</h3>
                            <p>Suhu Air</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                      <!-- small box -->
                        <div class="small-box bg-success">
                          <div class="inner">
                            <h3>{{ph_air}} pH</h3>
                            <p>pH Air</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                      <!-- small box -->
                        <div class="small-box bg-warning">
                          <div class="inner">
                            <h3>{{intensitas_cahaya}} Lux</h3>
                            <p>Intensitas Cahaya</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                      <!-- small box -->
                        <div class="small-box bg-danger">
                          <div class="inner">
                            <h3>{{ketinggian_air}} MDPL</h3>
                            <p>Ketinggian</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                    </div>
                    <br/>
                    <dl class="row">
                      <dt class="col-sm-4">Kekeruhan</dt>
                      <dd class="col-sm-8">{{kekeruhan}} NTU</dd>
                      <dt class="col-sm-4">Kecepatan Air</dt>
                      <dd class="col-sm-8">{{kecepatan_air}} m/s</dd>
                      <dt class="col-sm-4">Kelembapan Udara</dt>
                      <dd class="col-sm-8">{{kelembapan_udara}}</dd>
                      <dt class="col-sm-4">Suhu Udara</dt>
                      <dd class="col-sm-8">{{suhu_udara}} °C</dd>
                    </dl>
                  </div>
                  <div class="tab-pane fade" id="grafik" role="tabpanel" aria-labelledby="custom-content-below-grafik-tab">
                    <br/>
                    <dl class="row">
                      <div class="col-sm-6">
                      <!-- small box -->
                        <div class="small-box">
                          <div class="inner">
                            <dt class="col-sm-4">Suhu Air</dt>
                            <line-chart :data="graph_suhu_air"></line-chart>
                            <br/>
                            <dl class="row">
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-success">
                                  <div class="inner">
                                    <dt class="col-sm-6">Tertinggi</dt>
                                    <dd class="col-sm-6">{{suhu_air_tertinggi}} °C</dd>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-warning">
                                  <div class="inner">
                                    <dt class="col-sm-6">Terendah</dt>
                                    <dd class="col-sm-6">{{suhu_air_terendah}} °C</dd>
                                  </div>
                                </div>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                      <!-- small box -->
                        <div class="small-box">
                          <div class="inner">
                            <dt class="col-sm-4">pH Air</dt>
                            <line-chart :data="graph_ph_air"></line-chart>
                            <br/>
                            <dl class="row">
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-success">
                                  <div class="inner">
                                    <dt class="col-sm-6">Tertinggi</dt>
                                    <dd class="col-sm-6">{{ph_tertinggi}} pH</dd>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-warning">
                                  <div class="inner">
                                    <dt class="col-sm-6">Terendah</dt>
                                    <dd class="col-sm-6">{{ph_terendah}} pH</dd>
                                  </div>
                                </div>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                      <!-- small box -->
                        <div class="small-box">
                          <div class="inner">
                            <dt class="col-sm-4">Intensitas Cahaya</dt>
                            <line-chart :data="graph_intensitas"></line-chart>
                            <br/>
                            <dl class="row">
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-success">
                                  <div class="inner">
                                    <dt class="col-sm-6">Tertinggi</dt>
                                    <dd class="col-sm-6">{{intensitas_tertinggi}} Lux</dd>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-warning">
                                  <div class="inner">
                                    <dt class="col-sm-6">Terendah</dt>
                                    <dd class="col-sm-6">{{intensitas_terendah}} Lux</dd>
                                  </div>
                                </div>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                      <!-- small box -->
                        <div class="small-box">
                          <div class="inner">
                            <dt class="col-sm-4">Ketinggian</dt>
                            <line-chart :data="graph_ketinggian"></line-chart>
                            <br/>
                            <dl class="row">
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-success">
                                  <div class="inner">
                                    <dt class="col-sm-6">Tertinggi</dt>
                                    <dd class="col-sm-6">{{ketinggian_tertinggi}} MDPL</dd>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-warning">
                                  <div class="inner">
                                    <dt class="col-sm-6">Terendah</dt>
                                    <dd class="col-sm-6">{{ketinggian_terendah}} MDPL</dd>
                                  </div>
                                </div>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                      <!-- small box -->
                        <div class="small-box">
                          <div class="inner">
                            <dt class="col-sm-4">Kekeruhan</dt>
                            <line-chart :data="graph_kekeruhan"></line-chart>
                            <br/>
                            <dl class="row">
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-success">
                                  <div class="inner">
                                    <dt class="col-sm-6">Tertinggi</dt>
                                    <dd class="col-sm-6">{{kekeruhan_tertinggi}} NTU</dd>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-warning">
                                  <div class="inner">
                                    <dt class="col-sm-6">Terendah</dt>
                                    <dd class="col-sm-6">{{kekeruhan_terendah}} NTU</dd>
                                  </div>
                                </div>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                      <!-- small box -->
                        <div class="small-box">
                          <div class="inner">
                            <dt class="col-sm-4">Kecepatan Air</dt>
                            <line-chart :data="graph_kecepatan"></line-chart>
                            <br/>
                            <dl class="row">
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-success">
                                  <div class="inner">
                                    <dt class="col-sm-6">Tertinggi</dt>
                                    <dd class="col-sm-6">{{kecepatan_tertinggi}} m/s</dd>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-warning">
                                  <div class="inner">
                                    <dt class="col-sm-6">Terendah</dt>
                                    <dd class="col-sm-6">{{kecepatan_terendah}} m/s</dd>
                                  </div>
                                </div>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                      <!-- small box -->
                        <div class="small-box">
                          <div class="inner">
                            <dt class="col-sm-4">Kelembapan Udara</dt>
                            <line-chart :data="graph_kelembapan"></line-chart>
                            <br/>
                            <dl class="row">
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-success">
                                  <div class="inner">
                                    <dt class="col-sm-6">Tertinggi</dt>
                                    <dd class="col-sm-6">{{kelembapan_tertinggi}}</dd>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-warning">
                                  <div class="inner">
                                    <dt class="col-sm-6">Terendah</dt>
                                    <dd class="col-sm-6">{{kelembapan_terendah}}</dd>
                                  </div>
                                </div>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                      <!-- small box -->
                        <div class="small-box">
                          <div class="inner">
                            <dt class="col-sm-4">Suhu Udara</dt>
                            <line-chart :data="graph_suhu_udara"></line-chart>
                            <br/>
                            <dl class="row">
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-success">
                                  <div class="inner">
                                    <dt class="col-sm-6">Tertinggi</dt>
                                    <dd class="col-sm-6">{{suhu_udara}} °C</dd>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                              <!-- small box -->
                                <div class="small-box bg-warning">
                                  <div class="inner">
                                    <dt class="col-sm-6">Terendah</dt>
                                    <dd class="col-sm-6">{{suhu_udara_terendah}} °C</dd>
                                  </div>
                                </div>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </dl>
                  </div>
                  <div class="tab-pane fade" id="lokasi" role="tabpanel" aria-labelledby="custom-content-below-lokasi-tab">
                    <br/>
                    <GmapMap
                      :center='center'
                      :zoom='18'
                      style='width:100%; height:400px;'
                    >
                      <GmapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                      />
                      <!-- <gmap-info-window
                        :options="infoOptions"
                        :position="infoWindowPos"
                        :opened="infoWinOpen"
                        @closeclick="infoWinOpen=false"
                      ></gmap-info-window> -->
                    </GmapMap>
                    <br/>
                    <dl class="row">
                      <dt class="col-sm-4">Lokasi</dt>
                      <dd class="col-sm-8">{{address}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <!-- /.card-body-->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
  </div>
</template>

<script>
import {getHeader, produksiUrl, kolamUrl} from '../../config'
import axios from 'axios'
import moment from 'moment'
//import LineChart from '../../LineChart.js'

export default {
  data: function () {
   return {
    //  infoWindowPos: null,
    //  infoWinOpen: false,
    //  currentMidx: null,
    //  infoOptions: {
    //    content: "",
          //optional: offset infowindow so it visually sits nicely on top of our marker
    //    pixelOffset: {
    //      width: 0,
    //      height: -35
    //    }
    //  },
     center: {
       lat: -6.5580193,
       lng: 106.731317
     },
     markers: [
       {
         position: {
           lat: '',
           lng: ''
         },
         visible: ''
       }
     ],
     kolam: [],
     prod: [],
     suhu_air: '',
     ph_air: '',
     intensitas_cahaya: '',
     ketinggian_air: '',
     kekeruhan: '',
     kecepatan_air: '',
     kelembapan_udara: '',
     suhu_udara: '',
     graph_suhu_air:[],
     graph_ph_air:[],
     graph_intensitas:[],
     graph_ketinggian:[],
     graph_kekeruhan:[],
     graph_kecepatan:[],
     graph_kelembapan:[],
     graph_suhu_udara:[],
     suhu_air_tertinggi: '',
     suhu_air_terendah: '',
     ph_tertinggi: '',
     ph_terendah: '',
     intensitas_tertinggi: '',
     intensitas_terendah: '',
     ketinggian_tertinggi: '',
     ketinggian_terendah: '',
     kekeruhan_tertinggi: '',
     kekeruhan_terendah: '',
     kecepatan_tertinggi: '',
     kecepatan_terendah: '',
     kelembapan_tertinggi: '',
     kelembapan_terendah: '',
     suhu_udara_tertinggi: '',
     suhu_udara_terendah: '',
     isHidden: true,
     rt :null,
     latitude: '',
     longitude: '',
     address: ''

     //graphlabel:[]
     /*chartData: {
       '2017-05-13' : 2,
       '2017-05-14' : 5,
       '2017-05-15' : 4
     }*/
   }
 },

 mounted() {
   this.geolocate();
 },

 methods: {
  //  toggleInfoWindow: function(marker, idx) {
  //    this.infoWindowPos = marker.position;
  //    this.infoOptions.content = marker.infoText;

        //check if its the same marker that was selected if yes toggle
  //    if (this.currentMidx === idx) {
  //      this.infoWinOpen = !this.infoWinOpen;
  //    }
        //if different marker set infowindow to open and reset current marker index
  //    else {
  //      this.infoWinOpen = true;
  //      this.currentMidx = idx;
  //    }
  //  },
       
   getKolam: function(){
     var app = this;
     axios.get(kolamUrl, {headers: getHeader()})
     .then(function(response){
       app.kolam=response.data.data;
       //console.log(app.kolam)
     })
   },

   getProduksi: function(event){
     var app = this;
     app.isHidden = true;
     var key = event.target.value;
     var prodUrl = kolamUrl + '/' + key + '/produksi';
     axios.get(prodUrl, {headers: getHeader()})
     .then(function(response){
       app.prod=response.data.data.data;
       app.isHidden=false;
       //console.log(app.prod)
     })
   },

   getOutput: function(event) {
     var app = this;
     window.clearInterval(this.rt)
     var key = event.target.value;
     const outputUrl = produksiUrl+'/'+ key +'/output-sensor/latest'
     app.getLog(key)
     app.rt = setInterval(() => {    
       axios.get(outputUrl, {headers: getHeader()})
       .then(function (response) {
         app.suhu_air = response.data.data.suhu_air;
         app.ph_air = response.data.data.ph_air;
         app.intensitas_cahaya = response.data.data.intensitas_cahaya;
         app.ketinggian_air = response.data.data.ketinggian_air;
         app.kekeruhan = response.data.data.kekeruhan;
         app.kecepatan_air = response.data.data.kecepatan_air;
         app.kelembapan_udara = response.data.data.kelembapan_udara;
         app.suhu_udara = response.data.data.suhu_udara;
         app.latitude = response.data.data.latitude;
         app.longitude = response.data.data.longitude;
         const marker = {
           lat: response.data.data.latitude,
           lng: response.data.data.longitude,
         };
         app.markers.push({ position: marker });
         app.center = marker;
         for(let i=0;i<app.markers.length;i++){
           app.markers[i]["visible"] = false;
         }
         axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + app.latitude + ',' + app.longitude + 
         '&key=GoogleMapsAPIKey')
         .then(response => {
           app.address = response.data.results[0].formatted_address;
         })
         if(response.data.data.suhu_air > 34){
           app.suhutinggi(); //34 adalah nilai suhu tinggi sementara, nanti ditanya ke pak ganjar berapa patokan suhu terlalu tinggi
         }
         if(response.data.data.kekeruhan > 50){
           app.panennotif(); //50 adalah ntu sementara, nanti tanya pak ganjar nilai pastinya
         }
         if(response.data.data.kecepatan_air <= 1){
           app.waternotif(); //nanti ditanya mending 1 apa 0
         }
         console.log(app.data);
       })
       .catch(function (error) {
           console.log(error.message);
       });
     }, 5000);
   },
     
   getLog: function(key) {
     var app = this;
     app.graph_suhu_air = []
     app.graph_ph_air = []
     app.graph_intensitas = []
     app.graph_ketinggian = []
     app.graph_kekeruhan = []
     app.graph_kecepatan = []
     app.graph_kelembapan = []
     app.graph_suhu_udara = []
     //console.log(moment("2020-07-26 11:11:14").format())
     var logUrl = produksiUrl + '/'+key+'/output-sensor'
     //var downloadUrl = logUrl + '/download'
     axios.get(logUrl, {headers: getHeader()})
     .then(function (response) {
       var temp = []
       temp = response.data.data;
       // grafik
       for (let i = 0; i < temp.data.length; i++) {
         var a = []; var b = []; var c = []; var d = [];
         var e = []; var f = []; var g = [];  var h = [];
         var date = ''
         //console.log(temp.data[i].created_at)
         if(i<10){
           date = '2022-07-26 11:11:0' + i
         }
         else{
           date = '2022-07-26 11:11:' + i
         }
         // console.log(date)
         a.push(moment(date).format("HH:mm:ss"))
         b.push(moment(date).format("HH:mm:ss"))
         c.push(moment(date).format("HH:mm:ss"))
         d.push(moment(date).format("HH:mm:ss"))
         e.push(moment(date).format("HH:mm:ss"))
         f.push(moment(date).format("HH:mm:ss"))
         g.push(moment(date).format("HH:mm:ss"))
         h.push(moment(date).format("HH:mm:ss")) 
         //x.push(moment(temp.data[i].created_at).format())  
         a.push(temp.data[i].suhu_air)
         b.push(temp.data[i].ph_air)
         c.push(temp.data[i].intensitas_cahaya)
         d.push(temp.data[i].ketinggian_air)
         e.push(temp.data[i].kekeruhan)
         f.push(temp.data[i].kecepatan_air)
         g.push(temp.data[i].kelembapan_udara)
         h.push(temp.data[i].suhu_udara)
         app.graph_suhu_air.push(a)
         app.graph_ph_air.push(b)
         app.graph_intensitas.push(c)
         app.graph_ketinggian.push(d)
         app.graph_kekeruhan.push(e)
         app.graph_kecepatan.push(f)
         app.graph_kelembapan.push(g)
         app.graph_suhu_udara.push(h)
       }

       // statistik
       var x = []
       x = response.data.data;
       var max_suhu_air = x.data[0].suhu_air;
       var min_suhu_air = x.data[0].suhu_air;
       var max_ph_air = x.data[0].ph_air;
       var min_ph_air = x.data[0].ph_air;
       var max_intensitas = x.data[0].intensitas_cahaya;
       var min_intensitas = x.data[0].intensitas_cahaya;
       var max_tinggi = x.data[0].ketinggian_air;
       var min_tinggi = x.data[0].ketinggian_air;
       var max_keruh = x.data[0].kekeruhan;
       var min_keruh = x.data[0].kekeruhan;
       var max_kecepatan = x.data[0].kecepatan_air;
       var min_kecepatan = x.data[0].kecepatan_air;
       var max_lembap = x.data[0].kelembapan_udara;
       var min_lembap = x.data[0].kelembapan_udara;
       var max_suhu_udara = x.data[0].suhu_udara;
       var min_suhu_udara = x.data[0].suhu_udara;
       
       for (let j = 0; j < x.data.length; j++) {
        // suhu air
         if(x.data[j].suhu_air > max_suhu_air) {
          max_suhu_air = x.data[j].suhu_air
         }
         if(x.data[j].suhu_air < min_suhu_air) {
          min_suhu_air = x.data[j].suhu_air
         }
         // ph air
         if(x.data[j].ph_air > max_ph_air) {
          max_ph_air = x.data[j].ph_air
         }
         if(x.data[j].ph_air < min_ph_air) {
          min_ph_air = x.data[j].ph_air
         }
         // intensitas cahaya
         if(x.data[j].intensitas_cahaya > max_intensitas) {
          max_intensitas = x.data[j].intensitas_cahaya
         }
         if(x.data[j].intensitas_cahaya < min_intensitas) {
          min_intensitas = x.data[j].intensitas_cahaya
         }
         // ketinggian
         if(x.data[j].ketinggian_air > max_tinggi) {
          max_tinggi = x.data[j].ketinggian_air
         }
         if(x.data[j].ketinggian_air < min_tinggi) {
          min_tinggi = x.data[j].ketinggian_air
         }
         // kekeruhan
         if(x.data[j].kekeruhan > max_keruh) {
          max_keruh = x.data[j].kekeruhan
         }
         if(x.data[j].kekeruhan < min_keruh) {
          min_keruh = x.data[j].kekeruhan
         }
         // kecepatan air
         if(x.data[j].kecepatan_air > max_kecepatan) {
          max_kecepatan= x.data[j].kecepatan_air
         }
         if(x.data[j].kecepatan_air < min_kecepatan) {
          min_kecepatan = x.data[j].kecepatan_air
         }
         // kelembapan
         if(x.data[j].kelembapan_udara > max_lembap) {
          max_lembap = x.data[j].kelembapan_udara
         }
         if(x.data[j].kelembapan_udara < min_lembap) {
          min_lembap = x.data[j].kelembapan_udara
         }
         // suhu udara
         if(x.data[j].suhu_udara > max_suhu_udara) {
          max_suhu_udara = x.data[j].suhu_udara
         }
         if(x.data[j].suhu_udara < min_suhu_udara) {
          min_suhu_udara = x.data[j].suhu_udara
         }
       }
       
       // data tertinggi
       app.suhu_air_tertinggi = max_suhu_air
       app.ph_tertinggi = max_ph_air
       app.intensitas_tertinggi = max_intensitas
       app.ketinggian_tertinggi = max_tinggi
       app.kekeruhan_tertinggi = max_keruh
       app.kecepatan_tertinggi = max_kecepatan
       app.kelembapan_tertinggi = max_lembap
       app.suhu_udara_tertinggi = max_suhu_udara

       // data terendah
       app.suhu_air_terendah = min_suhu_air
       app.ph_terendah = min_ph_air
       app.intensitas_terendah = min_intensitas
       app.ketinggian_terendah = min_tinggi
       app.kekeruhan_terendah = min_keruh
       app.kecepatan_terendah = min_kecepatan
       app.kelembapan_terendah = min_lembap
       app.suhu_udara_terendah = min_suhu_udara
       //console.log(app.graphdata);
     })
     .catch(function (error) {
       console.log(error.message);
     });
   },

   suhutinggi: function() {
     this.$bvToast.toast('Suhu Terlalu Tinggi', {
       title: 'Peringatan',
       variant: 'danger',
       solid: true
     })
   },
   
   panennotif: function() {
     this.$bvToast.toast('Produksi siap untuk dipanen', {
       title: 'Notifikasi',
       variant: 'success',
       solid: true
     })
   },

   waternotif: function() {
     this.$bvToast.toast('Paddlewheel sedang tidak berjalan', {
       title: 'Peringatan',
       variant: 'warning',
       solid: true
     })
   }
 },

 created() {
   this.getKolam();
   //this.getLog();
 }
}
</script>
