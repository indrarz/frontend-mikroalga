<template>
      <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
            <div class="col-12">
                <!-- interactive chart -->
                <div class="card card-primary card-outline">
                  <div class="card-header">
                    <h3 class="card-title">
                      <i class="far fa-chart-bar"></i>
                      Data Sensor
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
                        <select class="form-control" @change="getLog">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="prod in prod" :key="prod.id" v-bind:value="prod.id">Produksi {{prod.id}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                      <button type="button" class="btn btn-primary" @click="downloadLog(link.link)" v-if="hideButton === false"><i class="fas fa-download"></i> Unduh Semua Log Data</button>
                              <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                      <th>Tanggal</th>
                                      <!--<th>Jam</th>-->
                                      <th>pH</th>
                                      <th>Kekeruhan Air (NTU)</th>
                                      <th>Kecepatan Air (cm<sup>3</sup>/s)</th>
                                      <th>Kecepatan Udara (cm/s)</th>
                                      <th>Suhu Air (°C)</th>
                                      <th>Energi (kW/h)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="data in data.data" :key="data.id">
                                      <td>{{data.created_at}}</td>
                                      <!--<td>00.00.00</td>-->
                                      <td>{{data.ph_air}}</td>
                                      <td>{{data.kekeruhan}}</td>
                                      <td>{{data.kecepatan_air}}</td>
                                      <td>{{data.aliran_udara}}</td>
                                      <td>{{data.suhu_air}}</td>
                                      <td>{{data.energi_listrik}}</td>
                                    </tr>
                                                                               
                                    </tbody>
                                  </table>
                                   <div class="text-center mt-5">
                                     <b-button v-if="hidefirst==false" variant="light" @click="first()"><i class="fas fa-angle-double-left"></i></b-button>
                                     <b-button v-if="hidefirst==false" class="mr-3" variant="light" @click="prev()"><i class="fas fa-angle-left"></i></b-button>
                                     <span>{{current_page}}</span>
                                     <b-button v-if="hidelast==false" class="ml-3" variant="light" @click="next()"><i class="fas fa-angle-right"></i></b-button>
                                     <b-button v-if="hidelast==false" variant="light" @click="last()"><i class="fas fa-angle-double-right"></i></b-button>
                                   </div>
                  </div>
                  <!-- /.card-body-->
                  <div class="card-footer">
                    
                  </div>
                </div>
                <!-- /.card -->
    
              </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import {getHeader, produksiUrl, kolamUrl, userUrl} from '../../config'
import axios from 'axios'
import moment from 'moment'
export default {

    data: function () {
        return {
          data: [],
          kolam: [],
          prod: [],
          link: '',
          isHidden: true,
          hideButton: true,
          prod_id: '',
          myid: '',
          current_page: '',
          last_page: 0,
          hidefirst: true,
          hidelast: true
        }
    },

    methods: {
      next: function(){
        var app = this
        var logUrl = app.data.next_page_url
        app.data = []
        axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hideButton = false;
            if(app.current_page == app.data.last_page){
              app.hidelast = true
            }
            else{
              app.hidefirst = false
            }
            for (let i = 0; i < app.data.data.length; i++) {
              var temp = app.data.data[i].created_at
              app.data.data[i].created_at = moment(temp).format("DD MMMM YYYY, h:mm:ss");
              temp = null
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      last: function(){
        var app = this
        var logUrl = app.data.last_page_url
        app.data = []
        axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hideButton = false;
            app.hidelast = true
            app.hidefirst = false
            for (let i = 0; i < app.data.data.length; i++) {
              var temp = app.data.data[i].created_at
              app.data.data[i].created_at = moment(temp).format("DD MMMM YYYY, h:mm:ss");
              temp = null
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      prev: function(){
        var app = this
        var logUrl = app.data.prev_page_url
        app.data = []
        axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hideButton = false;
            if(app.current_page == 1){
              app.hidefirst = true
            }
            else{
              app.hidelast = false
            }
            for (let i = 0; i < app.data.data.length; i++) {
              var temp = app.data.data[i].created_at
              app.data.data[i].created_at = moment(temp).format("DD MMMM YYYY, h:mm:ss");
              temp = null
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      first: function(){
        var app = this
        var logUrl = app.data.first_page_url
        app.data = []
        axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hideButton = false;
            app.hidefirst = true
            app.hidelast = false
            for (let i = 0; i < app.data.data.length; i++) {
              var temp = app.data.data[i].created_at
              app.data.data[i].created_at = moment(temp).format("DD MMMM YYYY, h:mm:ss");
              temp = null
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      getMe: function(){
      var app = this;

         axios.get(userUrl, {headers: getHeader()})
            .then(function (response) {
            app.myid = response.data.id;
            //console.log(app.myid)
            
            //console.log(app.myid);
        })
        .catch(function (error) {
            console.log(error.message);
        });
    },
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
        app.isHidden=true
        var key = event.target.value;
        var prodUrl = kolamUrl + '/' + key + '/produksi';
        axios.get(prodUrl, {headers: getHeader()})
        .then(function(response){
          app.prod=response.data.data.data;
          app.isHidden=false;
          //console.log(app.prod)
        })
      },

      getLog: function(event) {
        var key = event.target.value;
        var app = this;
        app.data = []
        var izinUrl = produksiUrl + '/' + key + '/perizinan'
        var logUrl = produksiUrl + '/' + key + '/output-sensor'
        var downloadUrl = logUrl + '/download'
        var boleh = false
        axios.get(izinUrl, {headers: getHeader()})
        .then(function(response){
          for (let index = 0; index < response.data.data.data.length; index++) {
            if(response.data.data.data[index].id_aksi == 1100 && response.data.data.data[index].id_user == app.myid && response.data.data.data[index].is_approved == true){
              boleh = true
            }
          }
          if(boleh==true){
          app.prod_id = key
         axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            
            //console.log(app.data.next_page_url)
            app.current_page = app.data.current_page
            app.last_page = app.data.last_page
            app.hideButton = false;
            if(app.current_page != app.last_page){ 
            app.hidelast = false
            }
             for (let i = 0; i < app.data.data.length; i++) {
              var temp = app.data.data[i].created_at
              app.data.data[i].created_at = moment(temp).format("DD MMMM YYYY, h:mm:ss");
              temp = null
            }
            
        })
        .catch(function (error) {
            console.log(error.message);
        });
        axios.get(downloadUrl, {headers: getHeader()})
            .then(function (response) {
            app.link = response.data;
            //console.log(app.link)
        })
        .catch(function (error) {
            console.log(error.message);
        });
        }else{
          app.notapproved();
        }
        })
        


      },
      downloadLog: function(key){
        this.recordaksi()
        window.location.assign(key)
      },
      recordaksi: function(){
        var app = this
        //console.log(app.prod_id);
        const downloaddata={
          id_aksi: "1108" //tanya yoshi untuk kode id_aksi
        }
        var recordurl = produksiUrl + '/' +  app.prod_id + '/aksi'
        axios.post(recordurl,downloaddata, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      notapproved: function() {
          this.$bvToast.toast('Anda belum mengajukan perizinan', {
          title: 'Peringatan',
          variant: 'danger',
          solid: true
        })
        
      },

    },

    created() {
      this.getKolam();
      this.getMe();
      //this.getUsers();
    }

    }
</script>