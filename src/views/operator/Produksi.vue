<template>
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
                      <i class="fas fa-th-list"></i>
                       Produksi Mikroalga
                    </h3>
    
                  </div>
                  <div class="card-body">
                      <div class="form-group">
                        <label>Pilih Kolam</label>
                        <select class="form-control" @change="getProduksi">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="kolams in kolams.data" :key="kolams.id" v-bind:value="kolams.id">{{kolams.nama_kolam}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>No. Produksi</th>
                        <th>Spesies Mikroalga</th>
                        <th>Volume Produksi (L)</th>
                        <th>Waktu Mulai</th>
                        <th>Waktu Selesai</th>
                        <th>Hasil Produksi</th>
                        <th>Aksi</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(prod,index) in prod.data" :key="prod.id">
                        <td>Produksi {{prod.id}}</td>
                        <td>{{prod.mikroalga.nama_spesies}}</td>
                        <td>{{prod.volume_produksi}}</td>
                        <td>{{prod.waktu_mulai}}</td>
                        <td v-if="prod.waktu_selesai === null">-</td>
                        <td v-else>{{prod.waktu_selesai}}</td>
                        <td v-if="prod.hasil_produksi === null">-</td>
                        <td v-else>{{prod.hasil_produksi}}</td>
                        <td v-if="prod.waktu_selesai === null"><button type="button" class="btn btn-block btn-success btn-sm" @click="doPanen()" data-toggle="modal" data-target="#stop-panen" v-if="boleh[index] === true">Panen</button>
                          <button type="button" class="btn btn-block btn-primary btn-sm" @click="doNutrisi()" data-toggle="modal" data-target="#stop-nutrisi" v-if="boleh[index] === true">Tambahkan Nutrisi</button>
                          <button type="button" class="btn btn-block btn-info btn-sm" @click="doAir()" data-toggle="modal" data-target="#stop-air" v-if="boleh[index] === true">Tambahkan Air</button></td>
                        <td v-else></td>
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
                </div>
                <!-- /.card -->
    
              </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
      <!--Stop Panen Modal-->
    <div class="modal fade" id="stop-panen">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Pemanenan</h4>
            </div>
            
            <div class="modal-body">
              
              <p>Proses panen sedang berlangsung. Klik Stop apabila proses panen telah selesai.</p>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-danger" @click="stopPanen()" data-dismiss="modal">Stop</button>
            </div>
            
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
         <!--Stop Nutrisi Modal-->
    <div class="modal fade" id="stop-nutrisi">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Penambahan Nutrisi</h4>
            </div>
            
            <div class="modal-body">
              
              <p>Proses penambahan nutrisi sedang berlangsung. Klik Stop apabila proses penambahan nutrisi telah selesai.</p>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-danger" @click="stopNutrisi()" data-dismiss="modal">Stop</button>
            </div>
            
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
         <!--Stop Tambah Air Modal-->
    <div class="modal fade" id="stop-air">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Penambahan Air</h4>
            </div>
            
            <div class="modal-body">
              
              <p>Proses penambahan air sedang berlangsung. Klik Stop apabila proses penambahan air telah selesai.</p>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-danger" @click="stopPanen()" data-dismiss="modal">Stop</button>
            </div>
            
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import {getHeader, kolamUrl, mikroalgaUrl, produksiUrl, aksiUrl, userUrl} from '../../config'
import axios from 'axios'
import moment from 'moment'
export default {
    data: function(){
        return{
            myid: '',
            kolams: [],
            prod: [],
            logaksi: [],
            algas: [],
            boleh: [],
            selectedKolam: '',
            selectedAlga: '',
            jumlahProduksi: '',
            current_page: '',
            last_page: '',
            hidefirst: true,
            hidelast: true
        }
    },

    methods: {
       next: function(){
        var app = this
        var nextUrl = app.data.next_page_url
        app.data = []
        axios.get(nextUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            if(app.current_page == app.data.last_page){
              app.hidelast = true
            }
            else{
              app.hidefirst = false
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      last: function(){
        var app = this
        var lastUrl = app.data.last_page_url
        app.data = []
        axios.get(lastUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hidelast = true
            app.hidefirst = false
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      prev: function(){
        var app = this
        var prevUrl = app.data.prev_page_url
        app.data = []
        axios.get(prevUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            if(app.current_page == 1){
              app.hidefirst = true
            }
            else{
              app.hidelast = false
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      first: function(){
        var app = this
        var firstUrl = app.data.first_page_url
        app.data = []
        axios.get(firstUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hidefirst = true
            app.hidelast = false
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
          app.kolams=response.data.data;
          //console.log(app.kolam)
        })
      },
      getMikroalga: function() {

        var app = this;

         axios.get(mikroalgaUrl, {headers: getHeader()})
            .then(function (response) {
            app.algas = response.data.data;
            //console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });

      },

      getProduksi: function(event){
        var key = event.target.value
        var app = this;
        app.boleh = []
        //console.log(app.myid)
        var prodUrl = kolamUrl + '/' + key + '/produksi';
        axios.get(prodUrl, {headers: getHeader()})
        .then(function(response){
          app.prod=response.data.data;
          app.current_page = response.data.data.current_page
          app.last_page = response.data.data.last_page
          if(app.current_page != app.last_page){ 
            app.hidelast = false
            }
          //app.isHidden=false;
          //console.log(app.prod[0].waktu_mulai)
          for (let index = 0; index < app.prod.data.length; index++) {
              //var kolamini = kolamUrl + '/' + app.prod.data[index].id_kolam
              var x = app.prod.data[index].waktu_mulai
              app.prod.data[index].waktu_mulai = moment(x).format("DD MMMM YYYY, h:mm:ss");
              x = null
              if (app.prod.data[index].waktu_selesai != null){
                x = app.prod.data[index].waktu_selesai
                app.prod.data[index].waktu_selesai = moment(x).format("DD MMMM YYYY, h:mm:ss");
              }
              var izinUrl = produksiUrl + '/' + app.prod.data[index].id + '/perizinan'
              var temp2 = []
              axios.get(izinUrl, {headers: getHeader()})
              .then(function(response){
                for (let j = 0; j < response.data.data.data.length; j++) {
                  if(response.data.data.data[j].id_aksi == 1200 && response.data.data.data[j].id_user == app.myid && response.data.data.data[j].is_approved == true){
                   temp2.push(true)
                   
                  }
                }
                app.boleh = temp2
              })
              
              //console.log(temp2)
              
          }
          //console.log(app.namakolam)
          //console.log(app.namaalga)
        })
      },
      selectKolam: function(key){
        this.selectedKolam = key
      },
      selectAlga: function(key){
        this.selectedAlga = key
      },
      addProduksi: function(){
        const addData ={
          id_kolam : this.selectedKolam,
          id_mikroalga : this.selectedAlga,
          volume_produksi: this.add.volume_produksi,
        }
        axios.post(produksiUrl, addData, {headers: getHeader()})
        this.addsukses();
      },
      doPanen: function(){
        const postData ={
          mode : "manual",
          manual : "panen:1"
        }
        
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      stopPanen: function(){
         const postData ={
          mode : "manual",
          manual : "panen:0"
        }
        
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      doNutrisi: function(){
        const postData ={
          mode : "manual",
          manual : "nutrisi:1"
        }
        
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      stopNutrisi: function(){
         const postData ={
          mode : "manual",
          manual : "nutrisi:0"
        }
        
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      doAir: function(){
        const postData ={
          mode : "manual",
          manual : "air:1"
        }
        
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      stopAir: function(){
         const postData ={
          mode : "manual",
          manual : "air:0"
        }
        
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      addsukses: function() {
          this.$bvToast.toast('Produksi Berhasil Ditambahkan', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
        
      }
    },

    created(){
        this.getMe();
        
        this.getKolam();
        this.getMikroalga();
    }
}
</script>