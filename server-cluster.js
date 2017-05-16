// import cluster  from 'cluster';
// import os from 'os';
import app from './server';
import throng from 'throng';

const WORKERS = process.env.WEB_CONCURRENCY || 1;

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: app
});


// var cpus = os.cpus();
// if(cluster.isMaster){
  // cpus.forEach(function(){
  //     cluster.fork();
  // });

  // cluster.on('listening', (worker) => {
  //   console.log(`cluster connected ${worker.process.pid}`);
  // });

  // cluster.on('exit', worker => {
  //   console.log(`cluster ${worker.process.pid} disconnected`);
  //   cluster.fork();
  // })
// 
// } else {
//   app();
// }
