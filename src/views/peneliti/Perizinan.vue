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
                       Daftar Izin Akses
                    </h3>
    
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Nama Aksi</th>
                        <th>Produksi</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(list, index) in list.data" :key="list.id">
                        <td>{{nama[index]}}</td>
                        <td>{{email[index]}}</td>
                        <td v-if="list.id_aksi === 1101">Unduh Log Sensor</td>
                        <td v-else-if="list.id_aksi === 2501">Pemberian Nutrisi</td>
                        <td v-else-if="list.id_aksi === 2502">Pemanenan</td>
                        <td>Produksi {{list.id_produksi}}</td>
                        <td v-if="list.is_approved === null">Pending</td>
                        <td v-else-if="list.is_approved === 1">Diizinkan</td>
                        <td v-else-if="list.is_approved === 0">Ditolak</td>
                        <td v-if="list.is_approved === null">
                          <button type="button" class="btn btn-block bg-gradient-success btn-sm" @click="acceptLog(list.id)">Izinkan</button>
                           <button type="button" class="btn btn-block bg-gradient-danger btn-sm" @click="rejectLog(list.id)">Tolak</button>
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
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import {perizinanUrl, usersUrl, getHeader} from '../../config'
import axios from 'axios'
export default {
  data: function(){
    return{
      list: [],
      nama: [],
      email: []
    }
  },

  methods: {
    getLogaksi: function(){
      var app = this;
        axios.get(perizinanUrl, {headers: getHeader()})
        .then(function(response){
          app.list=response.data.data;
          //console.log(app.list.data.length)
          for (let index = 0; index < app.list.data.length; index++) {
            var namaUrl = usersUrl + '/' + app.list.data[index].id_user
            axios.get(namaUrl, {headers: getHeader()})
            .then(function(response){
              app.nama.push(response.data.data.nama);
              app.email.push(response.data.data.email);
              
              
            })
            
          }
          //console.log(app.user)
        })
    },
    acceptLog: function(key){
      //var app = this;
      var accUrl = perizinanUrl + '/' + key + '/approve'
      axios.put(accUrl, '', {headers: getHeader()})
      this.acceptsukses();
    },
    rejectLog: function(key){
      //var app = this;
      var rejectUrl = perizinanUrl + '/' + key + '/approve'
      axios.put(rejectUrl, '', {headers: getHeader()})
      this.rejectsukses();
    },
    acceptsukses: function() {
          this.$bvToast.toast('Permintaan aksi berhasil disetujui', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
        
      },
      rejectsukses: function(){
        this.$bvToast.toast('Permintaan aksi berhasil ditolak', {
          title: 'Notifikasi',
          variant: 'danger',
          solid: true
      })
      }
  },
  created(){
    this.getLogaksi();
  }
}
</script>