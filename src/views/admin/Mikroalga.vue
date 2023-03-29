<template>
      <!-- Content Wrapper. Contains page content -->
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
                      <i class="fab fa-envira"></i>
                      Data Mikroalga
                    </h3>
                  </div>
                  <div class="card-body">
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-add"><i class="fas fa-plus"></i> Tambahkan Mikroalga</button>

                              <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                      <th>Nama Spesies Mikroalga</th>
                                      <th>Suhu Air Optimal (°C)</th>
                                      <th>pH Optimal</th>
                                      <th>Intensitas Cahaya Optimal (Lux)</th>
                                      <th>Kekeruhan Minimum (NTU)</th>
                                      <th>Waktu Panen (Hari)</th>
                                      <th>Aksi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(mikroalga,index) in mikroalga.data" :key="mikroalga.id">
                                      <td>{{mikroalga.nama_spesies}}</td>
                                      <td>{{mikroalga.suhu_air_optimal}}</td>
                                      <td>{{mikroalga.ph_optimal}}</td>
                                      <td>{{mikroalga.intensitas_cahaya_optimal}}</td>
                                      <td>{{mikroalga.tingkat_kekeruhan}}</td>
                                      <td>{{mikroalga.waktu_panen}}</td>
                                      <td><button type="button" class="btn btn-block bg-gradient-success btn-sm" data-toggle="modal" data-target="#modal-edit" @click="getAlga(mikroalga.id)">Edit</button>
                                      <button type="button" class="btn btn-block bg-gradient-danger btn-sm" v-if="row[index] === 0" @click="delAlga(mikroalga.id, index)">Hapus</button>
                                      <button type="button" class="btn btn-block bg-gradient-success btn-sm" v-else @click="restorealga(mikroalga.id, index)">Pulihkan</button>
                                      </td>
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
      <!--Edit Mikroalga Modal-->
    <div class="modal fade" id="modal-edit">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Informasi Mikroalga</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="PUT">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Nama Spesies</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="data.nama_spesies" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label>Suhu Air Optimal</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control"  v-model="data.suhu_air_optimal" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label>pH Optimal</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control"  v-model="data.ph_optimal" required>
                      </div>
                  </div>
                  <input type='hidden' v-model="data.id">
                  <div class="form-group">
                      <label>Intensitas Cahaya Optimal</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control"  v-model="data.intensitas_cahaya_optimal" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label>Kekeruhan Minimum</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control"  v-model="data.tingkat_kekeruhan" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label>Waktu Panen</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control"  v-model="data.waktu_panen" required>
                      </div>
                  </div>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="editAlga()" data-dismiss="modal">Simpan</button>
            </div>
            </form>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
          <div class="modal fade" id="modal-add">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Tambahkan Informasi Mikroalga</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="POST">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Nama Spesies</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="add.nama_spesies" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label>Suhu Air Optimal</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control"  v-model="add.suhu_air_optimal" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label>pH Optimal</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control"  v-model="add.ph_optimal" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label>Intensitas Cahaya Optimal</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control"  v-model="add.intensitas_cahaya_optimal" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label>Kekeruhan Minimum</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control"  v-model="add.tingkat_kekeruhan" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label>Waktu Panen</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control"  v-model="add.waktu_panen" required>
                      </div>
                  </div>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="addAlga()" data-dismiss="modal">Simpan</button>
            </div>
            </form>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
    </section>

    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
import {getHeader, mikroalgaUrl} from '../../config'
import axios from 'axios'
export default {

    data: function () {
        return {
          mikroalga: [],
          data: [],
          row: [],
          add: {
            nama_spesies: '',
            suhu_air_optimal: '',
            ph_optimal: '',
            intensitas_cahaya_optimal: '',
            tingkat_kekeruhan: '',
            waktu_panen: '',
          },
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
      getAlga: function(key) {
          var app = this;
          var algaUrl = mikroalgaUrl + '/' + key
        axios.get(algaUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            this.getMikroalga();
            console.log(app.data.id);
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      editAlga: function(){
          const editData = {
              nama_spesies: this.data.nama_spesies,
              suhu_air_optimal: this.data.suhu_air_optimal,
              ph_optimal: this.data.ph_optimal,
              intensitas_cahaya_optimal: this.data.intensitas_cahaya_optimal,
              tingkat_kekeruhan: this.data.tingkat_kekeruhan,
              waktu_panen: this.data.waktu_panen
          }
          var editUrl = mikroalgaUrl + '/' + this.data.id
          axios.put(editUrl, editData, {headers: getHeader()})
          this.editsukses();
          this.getMikroalga();
          
      },
      async addAlga(){
        const addData = {
              nama_spesies: this.add.nama_spesies,
              suhu_air_optimal: this.add.suhu_air_optimal,
              ph_optimal: this.add.ph_optimal,
              intensitas_cahaya_optimal: this.add.intensitas_cahaya_optimal,
              tingkat_kekeruhan: this.add.tingkat_kekeruhan,
              waktu_panen: this.add.waktu_panen
          }
          try {
            await axios.post(mikroalgaUrl, addData, {headers: getHeader()});
            this.addsukses();
          } catch (error) {
            this.addgagal();
          }
          // axios.post(mikroalgaUrl, addData, {headers: getHeader()})
          // this.addsukses();
          this.getMikroalga();
          
      },
      delAlga: function(key, x){
        var delUrl = mikroalgaUrl + '/' + key;
        axios.delete(delUrl, {headers: getHeader()})
        this.delsukses();
        //this.getMikroalga();
        this.row.splice(x,1,1);
        //console.log(row)

      },
      restorealga: function(key,x){
        //window.console.log('id delete' + key)
        const resUrl = mikroalgaUrl + '/' + key + '/restore';
        axios.put(resUrl, key, {headers: getHeader()});
        this.restoresukses();
        //this.getMikroalga();
        this.row.splice(x,1,0)
      },
      getMikroalga: function() {

        var app = this;
        app.row = [];
         axios.get(mikroalgaUrl, {headers: getHeader()})
            .then(function (response) {
            app.mikroalga = response.data.data;
            app.current_page = response.data.data.current_page
            app.last_page = response.data.data.last_page
            if(app.current_page != app.last_page){ 
              app.hidelast = false
              }
            //console.log(app.mikroalga.data[0].id);
            for (let index = 0; index < app.mikroalga.data.length; index++) {
              if(app.mikroalga.data[index].deleted_at == null){
                app.row.push(0)
              }
              else{
                app.row.push(1)
              }
              
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });

      },
      addsukses: function() {
          this.$bvToast.toast('Mikroalga Berhasil Ditambahkan', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
        
      },
      addgagal: function() {
          this.$bvToast.toast('Mikroalga Gagal Ditambahkan', {
          title: 'Notifikasi',
          variant: 'danger',
          solid: true
        })
      },
      editsukses: function() {
        this.$bvToast.toast('Informasi Mikroalga Berhasil Diubah', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
      },
      restoresukses: function() {
        this.$bvToast.toast('Mikroalga Berhasil Dipulihkan', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
      },
      delsukses: function(){
        this.$bvToast.toast('Mikroalga Berhasil Dihapus', {
          title: 'Notifikasi',
          variant: 'danger',
          solid: true
      })
      }
      

    },

    created() {
      this.getMikroalga();
      
    }

    }
</script>