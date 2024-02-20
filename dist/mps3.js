async function w($,z){const J=await crypto.subtle.importKey("raw",typeof $==="string"?k.encode($):$,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]);return crypto.subtle.sign("HMAC",J,k.encode(z))}async function s($){return crypto.subtle.digest("SHA-256",typeof $==="string"?k.encode($):$)}var v=function($){return Array.prototype.map.call(new Uint8Array($),(z)=>("0"+z.toString(16)).slice(-2)).join("")},e=function($){return $.replace(/[!'()*]/g,(z)=>"%"+z.charCodeAt(0).toString(16).toUpperCase())},F0=function($,z){const{hostname:J,pathname:W}=$;if(J.endsWith(".r2.cloudflarestorage.com"))return["s3","auto"];if(J.endsWith(".backblazeb2.com")){const D=J.match(/^(?:[^.]+\.)?s3\.([^.]+)\.backblazeb2\.com$/);return D!=null?["s3",D[1]]:["",""]}const X=J.replace("dualstack.","").match(/([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(?:\.cn)?$/);let[Z,Q]=(X||["",""]).slice(1,3);if(Q==="us-gov")Q="us-gov-west-1";else if(Q==="s3"||Q==="s3-accelerate")Q="us-east-1",Z="s3";else if(Z==="iot")if(J.startsWith("iot."))Z="execute-api";else if(J.startsWith("data.jobs.iot."))Z="iot-jobs-data";else Z=W==="/mqtt"?"iotdevicegateway":"iotdata";else if(Z==="autoscaling"){const D=(z.get("X-Amz-Target")||"").split(".")[0];if(D==="AnyScaleFrontendService")Z="application-autoscaling";else if(D==="AnyScaleScalingPlannerFrontendService")Z="autoscaling-plans"}else if(Q==null&&Z.startsWith("s3-"))Q=Z.slice(3).replace(/^fips-|^external-1/,""),Z="s3";else if(Z.endsWith("-fips"))Z=Z.slice(0,-5);else if(Q&&/-\d$/.test(Z)&&!/-\d$/.test(Q))[Z,Q]=[Q,Z];return[P0[Z]||Z,Q]},k=new TextEncoder,P0={appstream2:"appstream",cloudhsmv2:"cloudhsm",email:"ses",marketplace:"aws-marketplace",mobile:"AWSMobileHubService",pinpoint:"mobiletargeting",queue:"sqs","git-codecommit":"codecommit","mturk-requester-sandbox":"mturk-requester","personalize-runtime":"personalize"},H0=new Set(["authorization","content-type","content-length","user-agent","presigned-expires","expect","x-amzn-trace-id","range","connection"]);class g{constructor({accessKeyId:$,secretAccessKey:z,sessionToken:J,service:W,region:X,cache:Z,retries:Q,initRetryMs:D}){if($==null)throw new TypeError("accessKeyId is a required option");if(z==null)throw new TypeError("secretAccessKey is a required option");this.accessKeyId=$,this.secretAccessKey=z,this.sessionToken=J,this.service=W,this.region=X,this.cache=Z||new Map,this.retries=Q!=null?Q:10,this.initRetryMs=D||50}async sign($,z){if($ instanceof Request){const{method:X,url:Z,headers:Q,body:D}=$;if(z=Object.assign({method:X,url:Z,headers:Q},z),z.body==null&&Q.has("Content-Type"))z.body=D!=null&&Q.has("X-Amz-Content-Sha256")?D:await $.clone().arrayBuffer();$=Z}const J=new $0(Object.assign({url:$},z,this,z&&z.aws)),W=Object.assign({},z,await J.sign());delete W.aws;try{return new Request(W.url.toString(),W)}catch(X){if(X instanceof TypeError)return new Request(W.url.toString(),Object.assign({duplex:"half"},W));throw X}}async fetch($,z){for(let J=0;J<=this.retries;J++){const W=fetch(await this.sign($,z));if(J===this.retries)return W;const X=await W;if(X.status<500&&X.status!==429)return X;await new Promise((Z)=>setTimeout(Z,Math.random()*this.initRetryMs*Math.pow(2,J)))}throw new Error("An unknown error occurred, ensure retries is not negative")}}class $0{constructor({method:$,url:z,headers:J,body:W,accessKeyId:X,secretAccessKey:Z,sessionToken:Q,service:D,region:O,cache:Y,datetime:P,signQuery:H,appendSessionToken:E,allHeaders:B,singleEncode:_}){if(z==null)throw new TypeError("url is a required option");if(X==null)throw new TypeError("accessKeyId is a required option");if(Z==null)throw new TypeError("secretAccessKey is a required option");this.method=$||(W?"POST":"GET"),this.url=new URL(z),this.headers=new Headers(J||{}),this.body=W,this.accessKeyId=X,this.secretAccessKey=Z,this.sessionToken=Q;let q,K;if(!D||!O)[q,K]=F0(this.url,this.headers);if(this.service=D||q||"",this.region=O||K||"us-east-1",this.cache=Y||new Map,this.datetime=P||(new Date()).toISOString().replace(/[:-]|\.\d{3}/g,""),this.signQuery=H,this.appendSessionToken=E||this.service==="iotdevicegateway",this.headers.delete("Host"),this.service==="s3"&&!this.signQuery&&!this.headers.has("X-Amz-Content-Sha256"))this.headers.set("X-Amz-Content-Sha256","UNSIGNED-PAYLOAD");const G=this.signQuery?this.url.searchParams:this.headers;if(G.set("X-Amz-Date",this.datetime),this.sessionToken&&!this.appendSessionToken)G.set("X-Amz-Security-Token",this.sessionToken);if(this.signableHeaders=["host",...this.headers.keys()].filter((U)=>B||!H0.has(U)).sort(),this.signedHeaders=this.signableHeaders.join(";"),this.canonicalHeaders=this.signableHeaders.map((U)=>U+":"+(U==="host"?this.url.host:(this.headers.get(U)||"").replace(/\s+/g," "))).join("\n"),this.credentialString=[this.datetime.slice(0,8),this.region,this.service,"aws4_request"].join("/"),this.signQuery){if(this.service==="s3"&&!G.has("X-Amz-Expires"))G.set("X-Amz-Expires","86400");G.set("X-Amz-Algorithm","AWS4-HMAC-SHA256"),G.set("X-Amz-Credential",this.accessKeyId+"/"+this.credentialString),G.set("X-Amz-SignedHeaders",this.signedHeaders)}if(this.service==="s3")try{this.encodedPath=decodeURIComponent(this.url.pathname.replace(/\+/g," "))}catch(U){this.encodedPath=this.url.pathname}else this.encodedPath=this.url.pathname.replace(/\/+/g,"/");if(!_)this.encodedPath=encodeURIComponent(this.encodedPath).replace(/%2F/g,"/");this.encodedPath=e(this.encodedPath);const o=new Set;this.encodedSearch=[...this.url.searchParams].filter(([U])=>{if(!U)return!1;if(this.service==="s3"){if(o.has(U))return!1;o.add(U)}return!0}).map((U)=>U.map((R)=>e(encodeURIComponent(R)))).sort(([U,R],[t,r])=>U<t?-1:U>t?1:R<r?-1:R>r?1:0).map((U)=>U.join("=")).join("&")}async sign(){if(this.signQuery){if(this.url.searchParams.set("X-Amz-Signature",await this.signature()),this.sessionToken&&this.appendSessionToken)this.url.searchParams.set("X-Amz-Security-Token",this.sessionToken)}else this.headers.set("Authorization",await this.authHeader());return{method:this.method,url:this.url,headers:this.headers,body:this.body}}async authHeader(){return["AWS4-HMAC-SHA256 Credential="+this.accessKeyId+"/"+this.credentialString,"SignedHeaders="+this.signedHeaders,"Signature="+await this.signature()].join(", ")}async signature(){const $=this.datetime.slice(0,8),z=[this.secretAccessKey,$,this.region,this.service].join();let J=this.cache.get(z);if(!J){const W=await w("AWS4"+this.secretAccessKey,$),X=await w(W,this.region),Z=await w(X,this.service);J=await w(Z,"aws4_request"),this.cache.set(z,J)}return v(await w(J,await this.stringToSign()))}async stringToSign(){return["AWS4-HMAC-SHA256",this.datetime,this.credentialString,v(await s(await this.canonicalString()))].join("\n")}async canonicalString(){return[this.method.toUpperCase(),this.encodedPath,this.encodedSearch,this.canonicalHeaders+"\n",this.signedHeaders,await this.hexBodyHash()].join("\n")}async hexBodyHash(){let $=this.headers.get("X-Amz-Content-Sha256")||(this.service==="s3"&&this.signQuery?"UNSIGNED-PAYLOAD":null);if($==null){if(this.body&&typeof this.body!=="string"&&!("byteLength"in this.body))throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");$=v(await s(this.body||""))}return $}}var T=()=>crypto.randomUUID(),z0=($)=>p($,10);var F=($)=>`${$.bucket}/${$.key}`;var B0=($,z)=>{const J=Math.ceil(z/5);return $.toString(32).padStart(J,"0")};var p=($,z)=>{const J=Math.pow(2,z)-1;return B0(J-$,z)},J0=($,z)=>{const J=Math.pow(2,z)-1,W=parseInt($,32);return J-W};var h=($=0)=>p($,42);var N=async($)=>{const z=Date.now();return[await $,Date.now()-z]},f=($,z)=>{if(z.adaptiveClock)return N($).then(([J,W])=>{if(J.status!==200)return J;const X=J.headers.get("date");if(X){let Z=0;const Q=new Date(X).getTime(),D=Date.now()+z.clockOffset;if(D<Q-W)Z=Q-D-W;else if(D>Q+1000+W)Z=Q+1000-D+W;if(Z>0)z.clockOffset=z.clockOffset+Z;if(Z>0)console.log("latency",W,"error",Z,"local_time",D,"server_time",Q,"config.clockOffset",z.clockOffset)}return J});return $};var W0=($,z)=>{const J=z.parseFromString($,"text/xml");if(!J)throw new Error(`Invalid XML: ${$}`);const W=J.getElementsByTagName("Contents"),X=(Z,Q)=>{const D=Z.getElementsByTagName(Q)[0]?.textContent;return D?decodeURIComponent(D.replace(/\+/g," ")):void 0};return{$metadata:{},Contents:Array.from(W).map((Z)=>{const Q=X(Z,"LastModified");return{ETag:X(Z,"ETag"),Key:X(Z,"Key"),LastModified:Q?new Date(Q):void 0}}),KeyCount:parseInt(X(J,"KeyCount")),ContinuationToken:X(J,"ContinuationToken"),NextContinuationToken:X(J,"NextContinuationToken"),StartAfter:X(J,"StartAfter")}};var x=async($,{retries:z=Number.MAX_VALUE,delay:J=100,max_delay:W=1e4}={})=>{try{return await $()}catch(X){if(z>0)return await new Promise((Z)=>setTimeout(Z,J)),x($,{retries:z-1,max_delay:W,delay:Math.min(J*1.5,W)});throw X}};class d{$;z;J;constructor($,z,J){this.fetch=$;this.endpoint=z;this.mps3=J}getUrl($,z,J){return`${this.endpoint}/${$}${z?`/${encodeURIComponent(z)}`:""}${J||""}`}async listObjectV2($){for(let z=0;z<10;z++){const J=this.getUrl($.Bucket,void 0,`/?list-type=2&prefix=${$.Prefix}&start-after=${$.StartAfter}`),W=await x(()=>this.fetch(J,{}));if(W.status===200)return W0(await W.text(),this.mps3.config.parser);else if(W.status===429)console.warn("listObjectV2: 429, retrying"),await new Promise((X)=>setTimeout(X,1000));else throw new Error(`Unexpected response: ${W.status} ${await W.text()}`)}throw new Error("Cannot contact server")}async putObject({Bucket:$,Key:z,Body:J,ChecksumSHA256:W}){const X=this.getUrl($,z),Z=await x(()=>f(this.fetch(X,{method:"PUT",body:J,headers:{"Content-Type":"application/json"}}),this.mps3.config));if(Z.status!==200)throw new Error(`Failed to PUT: ${await Z.text()}`);return{$metadata:{httpStatusCode:Z.status},Date:new Date(Z.headers.get("date")),ETag:Z.headers.get("ETag"),...Z.headers.get("x-amz-version-id")&&{VersionId:Z.headers.get("x-amz-version-id")}}}async deleteObject({Bucket:$,Key:z}){return{$metadata:{httpStatusCode:(await x(()=>this.fetch(this.getUrl($,z),{method:"DELETE"}))).status}}}async getObject({Bucket:$,Key:z,VersionId:J,IfNoneMatch:W}){const X=this.getUrl($,z,J?`?versionId=${J}`:""),Z=await x(()=>f(this.fetch(X,{method:"GET",headers:{"If-None-Match":W}}),this.mps3.config));switch(Z.status){case 404:return{$metadata:{httpStatusCode:404}};case 403:throw new Error("Access denied");default:{let Q;const D=Z.headers.get("content-type"),O=await Z.text();if(D==="application/json"||O&&O!=="")try{Q=JSON.parse(O)}catch(Y){throw new Error(`Failed to parse response as JSON ${X}`)}return{$metadata:{httpStatusCode:Z.status},Body:Q,ETag:Z.headers.get("ETag"),...Z.headers.get("x-amz-version-id")&&{VersionId:Z.headers.get("x-amz-version-id")}}}}}}class A{key;_vals;_keys;constructor($,z){if(this.key=$,this._vals=new Map,this._keys=new Map,z)for(let[J,W]of z)this.set(J,W)}get size(){return this._vals.size}set($,z){const J=this.key($);return this._vals.set(J,z),this._keys.set(J,$),this}get($){return this._vals.get(this.key($))}delete($){const z=this.key($);return this._keys.delete(z),this._vals.delete(z)}has($){return this._vals.has(this.key($))}values(){return this._vals.values()}keys(){return this._keys.values()}forEach($){return this._vals.forEach((z,J,W)=>$(z,this._keys.get(J)))}}var j=function($){return new Promise((z,J)=>{$.oncomplete=$.onsuccess=()=>z($.result),$.onabort=$.onerror=()=>J($.error)})},M=function($,z){const J=indexedDB.open($);J.onupgradeneeded=()=>J.result.createObjectStore(z);const W=j(J);return(X,Z)=>W.then((Q)=>Z(Q.transaction(z,X).objectStore(z)))},I=function(){if(!y)y=M("keyval-store","keyval");return y},L=function($,z=I()){return z("readonly",(J)=>j(J.get($)))},C=function($,z,J=I()){return J("readwrite",(W)=>{return W.put(z,$),j(W.transaction)})};var X0=function($,z=I()){return z("readonly",(J)=>Promise.all($.map((W)=>j(J.get(W)))))};var Z0=function($,z=I()){return z("readwrite",(J)=>{return J.delete($),j(J.transaction)})},S=function($,z=I()){return z("readwrite",(J)=>{return $.forEach((W)=>J.delete(W)),j(J.transaction)})};var C0=function($,z){return $.openCursor().onsuccess=function(){if(!this.result)return;z(this.result),this.result.continue()},j($.transaction)},b=function($=I()){return $("readonly",(z)=>{if(z.getAllKeys)return j(z.getAllKeys());const J=[];return C0(z,(W)=>J.push(W.key)).then(()=>J)})};var y;var V0=6,Q0=($)=>`write-${$.toString().padStart(V0,"0")}`;class u{session=T();proposedOperations=new Map;operationLabels=new Map;db;lastIndex=0;load=void 0;op=0;constructor($){this.db=$}async propose($,z,J=!1){if(this.proposedOperations.set($,[z,this.op++]),this.db){if(this.load&&!J)await this.load,this.proposedOperations.delete($),this.proposedOperations.set($,[z,this.op-1]);this.lastIndex++;const W=Q0(this.lastIndex);$[this.session]=this.lastIndex,await C(W,[...z.entries()].map(([X,Z])=>[JSON.stringify(X),Z]),this.db),console.log(`STORE ${W} ${JSON.stringify([...z.entries()])}`)}}async label($,z,J=!1){if(this.operationLabels.set(z,$),this.db){if(this.load&&!J)await this.load;const W=$[this.session];if(W===void 0)throw new Error("Cannot label an unproposed operation");const X=`label-${W}`;await C(X,z,this.db),console.log(`STORE ${X} ${z}`)}}async confirm($,z=!1){if(this.operationLabels.has($)){const J=this.operationLabels.get($);if(this.proposedOperations.delete(J),this.operationLabels.delete($),this.db){if(this.load&&!z)await this.load;const W=J[this.session],X=[Q0(W),`label-${W}`];await S(X,this.db),console.log(`DEL ${X}`)}}}async cancel($,z=!1){if(this.operationLabels.forEach((J,W)=>{if(J===$)this.operationLabels.delete(W)}),this.proposedOperations.delete($),this.db){if(this.load&&!z)await this.load;const J=$[this.session];await S([`write-${J}`,`label-${J}`],this.db)}}async flatten(){if(this.load)await this.load;const $=new A(F);return this.proposedOperations.forEach(([z,J])=>{z.forEach((W,X)=>{$.set(X,[W,J])})}),$}async restore($,z){return this.db=$,this.proposedOperations.clear(),this.operationLabels.clear(),this.lastIndex=0,this.load=new Promise(async(J)=>{const X=(await b(this.db)).filter((Q)=>Q.startsWith("write-")).sort();console.log("RESTORE",X);const Z=await X0(X,this.db);for(let Q=0;Q<X.length;Q++){const D=parseInt(X[Q].split("-")[1]);this.lastIndex=Math.max(this.lastIndex,D)}for(let Q=0;Q<X.length;Q++){const D=X[Q],O=parseInt(D.split("-")[1]),Y=Z[Q].map(([E,B])=>[JSON.parse(E),B]),P=await L(`label-${O}`,this.db);if(!Y)continue;const H=new Map(Y);await z(H,P),await S([`write-${O}`,`label-${O}`],this.db)}J(void 0)}),this.load}}function c($,z){if(z===void 0)return $;if(z===null)return;if(typeof z!=="object"||typeof $!=="object")return z;const J=typeof $==="object"?{...$}:{};for(let W in z)if(z[W]===null)delete J[W];else J[W]=c($[W],z[W]);return J}var l=($)=>JSON.parse(JSON.stringify($));var i="manifest",n={files:{},update:{}};class V{$;session_id=T().substring(0,3);latest_key=".";latest_state=l(n);loading;cache;db;latest_timestamp=0;writes=0;static manifestRegex=/@([0-9a-z]+)_[0-9a-z]+_[0-9a-z]{2}$/;constructor($){this.manifest=$}static manifestTimestamp=($)=>{const z=$.match(V.manifestRegex);if(!z)return 0;return J0(z[1],42)};static isValid($,z){if(!$.match(V.manifestRegex))return console.warn(`Rejecting manifest key ${$}`),!1;if(z===void 0)return!0;const W=this.manifestTimestamp($),X=z,Z=Math.abs(W-X.getTime())<5000;if(!Z)console.warn(`Clock skew detected ${$} vs ${X.getTime()}`);return Z}async restore($){this.db=$,this.loading=L(i,$).then((z)=>{if(z)this.latest_state=z,this.manifest.service.config.log(`RESTORE ${i}`)})}async getLatest(){if(this.loading)await this.loading;if(this.loading=void 0,!this.manifest.service.config.online)return this.latest_state;try{let $=void 0;if(this.manifest.service.config.minimizeListObjectsCalls){const Q=await this.manifest.service._getObject({operation:"POLL_LATEST_CHANGE",ref:this.manifest.ref,ifNoneMatch:this.cache?.etag,useCache:!1});if(Q.$metadata.httpStatusCode===304)return this.latest_state;$=Q.ETag}const z=`${this.manifest.ref.key}@${h(Date.now()+this.manifest.service.config.clockOffset+1e4)}`,[J,W]=await N(this.manifest.service.s3ClientLite.listObjectV2({Bucket:this.manifest.ref.bucket,Prefix:this.manifest.ref.key+"@",StartAfter:z})),X=J.Contents?.filter((Q)=>{if(!V.isValid(Q.Key,Q.LastModified)){if(this.manifest.service.config.autoclean)this.manifest.service._deleteObject({operation:"CLEANUP",ref:{bucket:this.manifest.ref.bucket,key:Q.Key}});return!1}return!0});if(this.manifest.service.config.log(`${W}ms LIST ${this.manifest.ref.bucket}/${this.manifest.ref.key} from ${z}`),X===void 0)return this.latest_state=l(n),this.latest_state;if(this.latest_timestamp=Math.max(this.latest_timestamp,V.manifestTimestamp(this.latest_key)),X.length>0){this.latest_key=X[0].Key;const Q=await this.manifest.service._getObject({operation:"GET_LATEST",ref:{bucket:this.manifest.ref.bucket,key:this.latest_key}});this.latest_state=Q.data}const Z=`${this.manifest.ref.key}@${h(Math.max(V.manifestTimestamp(this.latest_key)-5000,0))}`;for(let Q=X.length-1;Q>=0;Q--){const D=X[Q].Key;if(D>this.latest_key&&D>Z){if(this.manifest.service.config.autoclean)this.manifest.service._deleteObject({operation:"CLEANUP",ref:{bucket:this.manifest.ref.bucket,key:D}});continue}const O=await this.manifest.service._getObject({operation:"REPLAY",ref:{bucket:this.manifest.ref.bucket,key:D}}),Y=D.substring(D.lastIndexOf("@")+1);this.latest_state=c(this.latest_state,O.data?.update),this.manifest.observeVersionId(Y)}if(this.db)C(i,this.latest_state,this.db);return this.latest_state}catch($){if($.name==="NoSuchKey")return this.latest_state=n,this.latest_state;else throw $}}updateContent($,z,J){const W=()=>h(Math.max(Date.now()+this.manifest.service.config.clockOffset,this.latest_timestamp))+"_"+this.session_id+"_"+z0(this.writes++);let X=W();const Z=this.manifest.operationQueue.propose(z,$,J.isLoad),Q=Z.then(async()=>{try{const D=await z;let O,Y,P=!1;do{const H=await this.getLatest();H.update={files:{}};for(let[B,_]of D){const q=F(B);if(_){const K={version:_};H.update.files[q]=K}else H.update.files[q]=null}Y=this.manifest.ref.key+"@"+X,this.manifest.operationQueue.label(z,X,J.isLoad);const E=await this.manifest.service._putObject({operation:"PUT_MANIFEST",ref:{key:Y,bucket:this.manifest.ref.bucket},value:H});if(this.manifest.service.config.adaptiveClock&&!V.isValid(Y,E.Date))this.manifest.service.config.clockOffset=E.Date.getTime()-Date.now()+E.latency,console.log(this.manifest.service.config.clockOffset),X=W(),P=!0;else P=!1}while(P);if(this.manifest.service.config.minimizeListObjectsCalls)O=await this.manifest.service._putObject({operation:"TOUCH_LATEST_CHANGE",ref:{key:this.manifest.ref.key,bucket:this.manifest.ref.bucket},value:""});return this.manifest.poll(),O}catch(D){throw console.error(D),this.manifest.operationQueue.cancel(z,J.isLoad),D}});if(J.await==="local")return Z;else return Q}}class D0{$;z;J;queue=Promise.resolve();constructor($,z,J){this.ref=$;this.handler=z;this.lastVersion=J}notify($,z,J){this.queue=this.queue.then(()=>J).then((W)=>{if(z!==this.lastVersion)$.config.log(`${$.config.label} NOTIFY ${F(this.ref)} ${z}`),this.lastVersion=z,this.handler(W)})}}class a{$;z;subscribers=new Set;poller;pollInProgress=!1;syncer=new V(this);operationQueue=new u;constructor($,z){this.service=$;this.ref=z;console.log("Create manifest",F(z))}load($){this.syncer.restore($),this.operationQueue.restore($,async(z,J)=>{if(!J)await this.service._putAll(z,{manifests:[this.ref],await:"local",isLoad:!0});else await this.updateContent(z,Promise.resolve(new Map([[this.ref,J]])),{await:"local",isLoad:!0})})}observeVersionId($){this.operationQueue.confirm($)}async poll(){if(this.pollInProgress)return;if(this.pollInProgress=!0,this.subscriberCount===0&&this.poller)clearInterval(this.poller),this.poller=void 0;if(this.subscriberCount>0&&!this.poller)this.poller=setInterval(()=>this.poll(),this.service.config.pollFrequency);const $=await this.syncer.getLatest();if($===void 0){this.pollInProgress=!1;return}const z=await this.operationQueue.flatten();this.subscribers.forEach(async(J)=>{if(z.has(J.ref)){const[W,X]=z.get(J.ref);J.notify(this.service,`local-${X}`,Promise.resolve(W))}else{const W=$.files[F(J.ref)];if(W){const X=this.service._getObject({operation:"GET_CONTENT",ref:J.ref,version:W.version});J.notify(this.service,W.version,X.then((Z)=>Z.data))}else if(W===null)J.notify(this.service,void 0,Promise.resolve(void 0))}}),this.pollInProgress=!1}updateContent($,z,J){return this.syncer.updateContent($,z,J)}async getVersion($){return(await this.syncer.getLatest()).files[F($)]?.version}subscribe($,z){this.service.config.log(`SUBSCRIBE ${F($)} ${this.subscriberCount+1}`);const J=new D0($,z);return this.subscribers.add(J),()=>this.subscribers.delete(J)}get subscriberCount(){return this.subscribers.size}}var O0=async($,z)=>{const J=new URL($),W=new URLSearchParams(J.search),X=J.pathname.split("/"),Z=X[1],Q=X.slice(2).join("/"),D=M(Z,"v0");let O,Y=200;if(W.get("list-type")){const P=encodeURIComponent(W.get("prefix")||""),H=encodeURIComponent(W.get("start-after")||"");O=`<ListBucketResult>${(await b(D)).filter((B)=>`${B}`.startsWith(P)&&`${B}`>H).map((B)=>`<Contents><Key>${B}</Key></Contents>`)}</ListBucketResult>`}else if(z?.method==="GET")O=await L(Q,D),Y=O===void 0?404:200;else if(z?.method==="PUT")O=await z.body,await C(Q,O,D);else if(z?.method==="DELETE")await Z0(Q,D);else throw new Error;return new Response(O,{status:Y})};async function Y0($){const z=(new TextEncoder()).encode($),J=await crypto.subtle.digest("SHA-256",z);return btoa(String.fromCharCode(...new Uint8Array(J)))}class U0{static LOCAL_ENDPOINT="indexdb:";config;s3ClientLite;manifests=new A(F);memCache=new A(($)=>`${$.Bucket}${$.Key}${$.VersionId}${$.IfNoneMatch}`);diskCache;endpoint;constructor($){if(this.config={...$,label:$.label||"default",useChecksum:$.useChecksum===!1?!1:!0,autoclean:$.autoclean===!1?!1:!0,online:$.online===!1?!1:!0,offlineStorage:$.offlineStorage===!1?!1:!0,useVersioning:$.useVersioning||!1,pollFrequency:$.pollFrequency||1000,clockOffset:Math.floor($.clockOffset)||0,adaptiveClock:$.adaptiveClock===!1?!1:!0,minimizeListObjectsCalls:$.minimizeListObjectsCalls===!1?!1:!0,parser:$.parser||new DOMParser,defaultManifest:{bucket:$.defaultManifest?.bucket||$.defaultBucket,key:typeof $.defaultManifest=="string"?$.defaultManifest:$.defaultManifest?.key||"manifest.json"},log:(...J)=>($.log===!0?console.log:$.log||(()=>{}))(this.config.label,...J)},this.config.s3Config?.credentials instanceof Function)throw Error("We can't do that yet");this.endpoint=$.s3Config.endpoint||`https://s3.${$.s3Config.region}.amazonaws.com`;let z;if(this.config.s3Config?.credentials){const J=new g({accessKeyId:this.config.s3Config.credentials.accessKeyId,secretAccessKey:this.config.s3Config.credentials.secretAccessKey,sessionToken:this.config.s3Config.credentials.sessionToken,region:this.config.s3Config.region||"us-east-1",service:"s3",retries:0});z=(...W)=>J.fetch(...W)}else if(this.endpoint==U0.LOCAL_ENDPOINT)z=O0;else z=(global||window).fetch.bind(global||window);if(this.config.offlineStorage){const J=`mps3-${this.config.label}`;this.diskCache=M(J,"v0")}this.s3ClientLite=new d(this.config.online?z:()=>new Promise(()=>{}),this.endpoint,this)}getOrCreateManifest($){if(!this.manifests.has($)){const z=new a(this,$);if(this.manifests.set($,z),this.config.offlineStorage){const J=`mps3-${this.config.label}-${$.bucket}-${$.key}`,W=M(J,"v0");this.config.log(`Restoring manifest from ${J}`),z.load(W)}}return this.manifests.get($)}async get($,z={}){const J={...this.config.defaultManifest,...z.manifest},W=this.getOrCreateManifest(J),X={bucket:$.bucket||this.config.defaultBucket||this.config.defaultManifest.bucket,key:typeof $==="string"?$:$.key},Z=await W.operationQueue.flatten();if(Z.has(X))return this.config.log(`GET (cached) ${X} ${Z.get(X)}`),Z.get(X)[0];const Q=await W.getVersion(X);if(Q===void 0)return;return(await this._getObject({operation:"GET",ref:X,version:Q})).data}async _getObject($){let z;if(this.config.useVersioning)z={Bucket:$.ref.bucket,Key:$.ref.key,IfNoneMatch:$.ifNoneMatch,...$.version&&{VersionId:$.version}};else z={Bucket:$.ref.bucket,Key:`${$.ref.key}${$.version?`@${$.version}`:""}`,IfNoneMatch:$.ifNoneMatch};const J=`${z.Bucket}${z.Key}${z.VersionId}`;if($.useCache!==!1){if(this.memCache.has(z))return this.memCache.get(z);if(this.diskCache){const X=await L(J,this.diskCache);if(X)return this.config.log(`${$.operation} (disk cached) ${J}`),this.memCache.set(z,Promise.resolve(X)),X}}if(!this.config.online)throw new Error(`${this.config.label} Offline and value not cached for ${J}`);const W=N(this.s3ClientLite.getObject(z)).then(async([X,Z])=>{const Q={$metadata:X.$metadata,ETag:X.ETag,data:X.Body};return this.config.log(`${Z}ms ${$.operation} ${$.ref.bucket}/${$.ref.key}@${$.version} => ${Q.VersionId}`),Q}).catch((X)=>{if(X?.name==="304")return{$metadata:{httpStatusCode:304},data:void 0};else throw X});if($.useCache!==!1){if(this.memCache.set(z,W),this.diskCache)W.then((X)=>{C(`${z.Bucket}${z.Key}${z.VersionId}`,X,this.diskCache).then(()=>this.config.log(`STORE ${z.Bucket}${z.Key}`))})}return W}async delete($,z={}){return this.putAll(new Map([[$,void 0]]),z)}async put($,z,J={}){return this.putAll(new Map([[$,z]]),J)}async putAll($,z={}){const J=new Map([...$].map(([X,Z])=>[{bucket:X.bucket||this.config.defaultBucket||this.config.defaultManifest.bucket,key:typeof X==="string"?X:X.key},Z])),W=(z?.manifests||[this.config.defaultManifest]).map((X)=>({...this.config.defaultManifest,...X}));return this._putAll(J,{manifests:W,await:z.await||this.config.online?"remote":"local"})}async _putAll($,z){const J=new Map,W=new Promise(async(X,Z)=>{const Q=new Map,D=[];$.forEach((O,Y)=>{if(O!==void 0){let P=this.config.useVersioning?void 0:T();J.set(Y,O),D.push(this._putObject({operation:"PUT_CONTENT",ref:Y,value:O,version:P}).then((H)=>{if(this.config.useVersioning)if(H.VersionId===void 0)throw console.error(H),Error(`Bucket ${Y.bucket} is not version enabled!`);else P=H.VersionId;Q.set(Y,P)}))}else D.push(this._deleteObject({ref:Y}).then((P)=>{Q.set(Y,void 0)}))}),await Promise.all(D).catch(Z),X(Q)});return Promise.all(z.manifests.map((X)=>{return this.getOrCreateManifest(X).updateContent(J,W,{await:z.await,isLoad:z.isLoad===!0})}))}async _putObject($){const z=JSON.stringify($.value,null,2);let J;if(this.config.useVersioning)J={Bucket:$.ref.bucket,Key:$.ref.key,ContentType:"application/json",Body:z,...this.config.useChecksum&&{ChecksumSHA256:await Y0(z)}};else J={Bucket:$.ref.bucket,Key:`${$.ref.key}${$.version?`@${$.version}`:""}`,ContentType:"application/json",Body:z,...this.config.useChecksum&&{ChecksumSHA256:await Y0(z)}};const[W,X]=await N(this.s3ClientLite.putObject(J));if(this.config.log(`${X}ms ${$.operation} ${J.Bucket}/${J.Key} => ${W.VersionId}`),this.diskCache){const Z=`${J.Bucket}${J.Key}${$.version||W.VersionId}`,Q=JSON.parse(z);await C(Z,{$metadata:{httpStatusCode:200},etag:W.ETag,data:Q},this.diskCache).then(()=>this.config.log(`STORE ${Z}`))}return{...W,latency:X}}async _deleteObject($){const z={Bucket:$.ref.bucket,Key:$.ref.key},[J,W]=await N(this.s3ClientLite.deleteObject(z));return this.config.log(`${W}ms ${$.operation||"DELETE"} ${$.ref.bucket}/${$.ref.key} (${J.$metadata.httpStatusCode})}`),J}subscribe($,z,J){const W={...this.config.defaultManifest,...J?.manifest},X={key:typeof $==="string"?$:$.key,bucket:$.bucket||this.config.defaultBucket||W.bucket},Z=this.getOrCreateManifest(W),Q=Z.subscribe(X,z);return this.get(X,{manifest:W}).then((D)=>{this.config.log(`NOTIFY (initial) ${F(X)}`),queueMicrotask(()=>{z(D,void 0),Z.poll()})}).catch((D)=>{z(void 0,D)}),Q}refresh(){return Promise.all([...this.manifests.values()].map(($)=>$.poll()))}get subscriberCount(){return[...this.manifests.values()].reduce(($,z)=>$+z.subscriberCount,0)}}export{U0 as MPS3};
