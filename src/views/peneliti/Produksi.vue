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
                      <tr v-for="(prod,index) in prod" :key="prod.id">
                        <td>Produksi {{prod.id}}</td>
                        <td>{{namaalga[index]}}</td>
                        <td>{{prod.waktu_mulai}}</td>
                        <td v-if="prod.waktu_selesai === null">-</td>
                        <td v-else>{{prod.waktu_selesai}}</td>
                        <td v-if="prod.hasil_produksi === null">-</td>
                        <td v-else>{{prod.hasil_produksi}}</td>
                        <td v-if="prod.waktu_selesai === null"><button type="button" class="btn btn-block btn-success btn-sm" @click="doPanen()" data-toggle="modal" data-target="#stop-panen">Panen</button>
                          <button type="button" class="btn btn-block btn-primary btn-sm" @click="doNutrisi()" data-toggle="modal" data-target="#stop-nutrisi">Tambahkan Nutrisi</button>
                          <button type="button" class="btn btn-block btn-info btn-sm" @click="doAir()" data-toggle="modal" data-target="#stop-air">Tambahkan Air</button>
                          <button type="button" class="btn btn-block btn-danger btn-sm" @click="stopProduksi()">Akhiri Produksi</button></td>
                        <td v-else-if="prod.hasil_produksi === null">
                          <button type="button" class="btn btn-block btn-success btn-sm" @click="hasilProduksi()" data-toggle="modal" data-target="#stop-panen">Tambahkan Hasil Produksi</button>
                        </td>
                        <td v-else></td>
                      </tr>
                      </tbody>
                    </table>
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
                      <select class="form-control">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="kolams in kolams.data" :key="kolams.id" @click="selectKolam(kolams.id)">{{kolams.nama_kolam}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                  </div>
                  <div class="form-group">
                    <label>Pilih Spesies</label>
                    <select class="form-control">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="algas in algas.data" :key="algas.id" @click="selectAlga(algas.id)">{{algas.nama_spesies}}</option>
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
export default {
    data: function(){
        return{
            kolams: [],
            prod: [],
            //namakolam: [],
            namaalga: [],
            algas: [],
            selectedKolam: '',
            selectedAlga: '',
            jumlahProduksi: ''
        }
    },

    methods: {
        getKolam: function(){
        var app = this;
        axios.get(kolamUrl, {headers: getHeader()})
        .then(function(response){
          app.kolams=response.data.data;
          console.log(app.kolams)
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
        axios.get(prodUrl, {headers: getHeader()})
        .then(function(response){
          app.prod=response.data.data.data;
          //app.isHidden=false;
          //console.log(app.prod[0].waktu_mulai)
          for (let index = 0; index < app.prod.length; index++) {
              //var kolamini = kolamUrl + '/' + app.prod[index].id_kolam
              var algaini = mikroalgaUrl + '/' + app.prod[index].id_mikroalga
              /*axios.get(kolamini, {headers: getHeader()})
              .then(function(response){
                app.namakolam.push(response.data.data.nama_kolam)
              })*/
              var temp = []
              axios.get(algaini, {headers: getHeader()})
              .then(function(response){
                temp.push(response.data.data.nama_spesies)
                app.namaalga = temp
              })
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
          id_mikroalga : this.selectedAlga
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
      stopProduksi: function(key){
        var stopUrl = produksiUrl + '/' + key + '/end'
        axios.put(stopUrl, '', {headers: getHeader()})

      },
      hasilProduksi: function(key){
        var hasilUrl = produksiUrl + '/' + key + '/hasil-produksi'
        axios.put(hasilUrl, '', )
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