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
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-add"><i class="fas fa-plus"></i> Tambahkan Produksi</button>
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>No. Produksi</th>
                        <th>Spesies Mikroalga</th>
                        <th>Waktu Mulai</th>
                        <th>Waktu Selesai</th>
                        <th>Hasil Produksi</th>
                        <th>Aksi</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="prod in prod.data" :key="prod.id">
                        <td>Produksi {{prod.id}}</td>
                        <td>{{prod.mikroalga.nama_spesies}}</td>
                        <td>{{prod.waktu_mulai}}</td>
                        <td v-if="prod.waktu_selesai === null">-</td>
                        <td v-else>{{prod.waktu_selesai}}</td>
                        <td v-if="prod.hasil_produksi === null">-</td>
                        <td v-else>{{prod.hasil_produksi}}</td>
                        <td v-if="prod.waktu_selesai === null"><button type="button" class="btn btn-block btn-success btn-sm" @click="doPanen(prod.id)" data-toggle="modal" data-target="#stop-panen">Panen</button>
                          <button type="button" class="btn btn-block btn-primary btn-sm" @click="doNutrisi()" data-toggle="modal" data-target="#stop-nutrisi">Tambahkan Nutrisi</button>
                          <button type="button" class="btn btn-block btn-info btn-sm" @click="doAir()" data-toggle="modal" data-target="#stop-air">Tambahkan Air</button>
                          <button type="button" class="btn btn-block btn-danger btn-sm" @click="stopProduksi(prod.id)">Akhiri Produksi</button></td>
                        <td v-else-if="prod.hasil_produksi === null">
                       <!--add hasil produksi belom-->   <button type="button" class="btn btn-block btn-success btn-sm" data-toggle="modal" data-target="#hasil-produksi" @click="selectProd(prod.id)">Tambahkan Hasil Produksi</button>
                        </td>
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
      <!--Add Produksi Modal-->
    <div class="modal fade" id="modal-add">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Tambahkan Produksi Baru</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="PUT">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Pilih Kolam</label>
                      <select class="form-control" @change="selectKolam">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="kolams in kolams.data" :key="kolams.id" v-bind:value="kolams.id">{{kolams.nama_kolam}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                  </div>
                  <div class="form-group">
                    <label>Pilih Spesies</label>
                    <select class="form-control" @change="selectAlga">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="algas in algas.data" :key="algas.id" v-bind:value="algas.id">{{algas.nama_spesies}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
               </div>
              
          </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="addProduksi()" data-dismiss="modal">Simpan</button>
            </div>
            </form>
      </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <div class="modal fade" id="hasil-produksi">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Tambahkan Hasil Produksi</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="PUT">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Banyak Hasil Produksi</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="hasil.jumlah">
                      </div>
                      <input type='hidden' v-model="hasil.id">
                  </div>
          </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="hasilProduksi(prod.id)" data-dismiss="modal">Simpan</button>
            </div>
            </form>
      </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
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
import {getHeader, kolamUrl, mikroalgaUrl, produksiUrl, aksiUrl} from '../../config'
import axios from 'axios'
import moment from 'moment'
export default {
    data: function(){
        return{
            kolams: [],
            prod: [],
            //namakolam: [],
            algas: [],
            hasil:{
              id: '',
              jumlah: ''
            },
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
        getKolam: function(){
        var app = this;
        axios.get(kolamUrl, {headers: getHeader()})
        .then(function(response){
          app.kolams=response.data.data;
          //console.log(app.kolams)
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
        var prodUrl = kolamUrl + '/' + key + '/produksi';
        app.prod = []
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
              var x = app.prod.data[index].waktu_mulai
              app.prod.data[index].waktu_mulai = moment(x).format("DD MMMM YYYY, h:mm:ss");
              x = null
              if (app.prod.data[index].waktu_selesai != null){
                x = app.prod.data[index].waktu_selesai
                app.prod.data[index].waktu_selesai = moment(x).format("DD MMMM YYYY, h:mm:ss");
              }
              
          }
          //console.log(app.namakolam)
          //console.log(app.namaalga)
        })
      },
      selectKolam: function(event){
        this.selectedKolam = event.target.value
      },
      selectAlga: function(event){
        this.selectedAlga = event.target.value
      },
      addProduksi: function(){
        const addData ={
          id_mikroalga : this.selectedAlga
        }
        var addUrl = kolamUrl + "/" + this.selectedKolam + '/produksi'
        axios.post(addUrl, addData, {headers: getHeader()})  
        this.addsukses();
      },
      doPanen: function(key){
        const postData ={
          mode : "manual",
          manual : "panen:1"
        }
        var panenurl = produksiUrl + '/' + key + '/aksi'
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
        console.log(response)
        })
        const panendata={
          id_aksi: "1231" //tanya yoshi untuk kode id_aksi
        }
        axios.post(panenurl,panendata , {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      stopPanen: function(key){
         const postData ={
          mode : "manual",
          manual : "panen:0"
        }
        var panenurl = produksiUrl + '/' + key + '/aksi'
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })

        const panendata={
          id_aksi: "1232" //tanya yoshi untuk kode id_aksi
        }
        axios.post(panenurl,panendata, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      doNutrisi: function(key){
        const postData ={
          mode : "manual",
          manual : "nutrisi:1"
        }
        var panenurl = produksiUrl + '/' + key + '/aksi'
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
        const panendata={
          id_aksi: "1221" //tanya yoshi untuk kode id_aksi
        }
        axios.post(panenurl,panendata , {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      stopNutrisi: function(key){
         const postData ={
          mode : "manual",
          manual : "nutrisi:0"
        }
        var panenurl = produksiUrl + '/' + key + '/aksi'
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })

        const panendata={
          id_aksi: "1222" //tanya yoshi untuk kode id_aksi
        }
        axios.post(panenurl,panendata , {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      doAir: function(key){
        const postData ={
          mode : "manual",
          manual : "air:1"
        }
        var panenurl = produksiUrl + '/' + key + '/aksi'
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
        const panendata={
          id_aksi: "1211" //tanya yoshi untuk kode id_aksi
        }
        axios.post(panenurl,panendata , {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      stopAir: function(key){
         const postData ={
          mode : "manual",
          manual : "air:0"
        }
        var panenurl = produksiUrl + '/' + key + '/aksi'
        axios.post(aksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
        const panendata={
          id_aksi: "1212" //tanya yoshi untuk kode id_aksi
        }
        axios.post(panenurl,panendata , {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      },
      stopProduksi: function(key){
        var stopUrl = produksiUrl + '/' + key + '/end'
        axios.put(stopUrl, '', {headers: getHeader()})

      },
      selectProd: function(key){
        this.hasil.id = key
        console.log(key)
      },
      hasilProduksi: function(){
        const hasilData ={
          hasil_produksi: this.hasil.jumlah
        }
        var hasilUrl = produksiUrl + '/' + this.hasil.id + '/hasil-produksi'
        axios.put(hasilUrl, hasilData, {headers: getHeader()} )
        .then(function(){
          this.getProduksi(this.selectedKolam)
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
        this.getKolam();
        this.getMikroalga();
    }
}
</script>