var V=($,D)=>()=>(D||$((D={exports:{}}).exports,D),D.exports);var A=V((Y0,g)=>{Y0.serialize=function($){return $&&typeof $.toJSON==="function"?$.toJSON():$}});var p=V((L0,l)=>{var d=A().serialize;l.exports=function $(D,W){if(W=d(W),W===null||typeof W!=="object"||Array.isArray(W))return W;if(D=d(D),D===null||typeof D!=="object"||Array.isArray(D))D={};var X=Object.keys(W);for(var F=0;F<X.length;F++){var J=X[F];if(J==="__proto__"||J==="constructor"||J==="prototype")return D;if(W[J]===null){if(D.hasOwnProperty(J))delete D[J]}else D[J]=$(D[J],W[J])}return D}});var o=V((U0,f)=>{f.exports=function $(D,W){if(D===W)return!0;if(D&&W&&typeof D=="object"&&typeof W=="object"){if(D.constructor!==W.constructor)return!1;var X,F,J;if(Array.isArray(D)){if(X=D.length,X!=W.length)return!1;for(F=X;F--!==0;)if(!$(D[F],W[F]))return!1;return!0}if(D.constructor===RegExp)return D.source===W.source&&D.flags===W.flags;if(D.valueOf!==Object.prototype.valueOf)return D.valueOf()===W.valueOf();if(D.toString!==Object.prototype.toString)return D.toString()===W.toString();if(J=Object.keys(D),X=J.length,X!==Object.keys(W).length)return!1;for(F=X;F--!==0;)if(!Object.prototype.hasOwnProperty.call(W,J[F]))return!1;for(F=X;F--!==0;){var Y=J[F];if(!$(D[Y],W[Y]))return!1}return!0}return D!==D&&W!==W}});var i=V((P0,c)=>{var B0=function($,D){if($.length!==D.length)return!1;for(var W=0;W<$.length;W++)if(!q0(D[W],$[W]))return!1;return!0},q0=o(),L=A().serialize;c.exports=function $(D,W){if(D=L(D),W=L(W),D===null||W===null||typeof D!=="object"||typeof W!=="object"||Array.isArray(D)!==Array.isArray(W))return W;if(Array.isArray(D)){if(!B0(D,W))return W;return}var X={},F=Object.keys(D),J=Object.keys(W),Y,Z,B={};for(Z=0;Z<J.length;Z++)if(Y=J[Z],F.indexOf(Y)===-1)B[Y]=!0,X[Y]=L(W[Y]);var G={};for(Z=0;Z<F.length;Z++)if(Y=F[Z],J.indexOf(Y)===-1)G[Y]=!0,X[Y]=null;else if(D[Y]!==null&&typeof D[Y]==="object"){var z=$(D[Y],W[Y]);if(z!==void 0)X[Y]=z}else if(D[Y]!==W[Y])X[Y]=L(W[Y]);return Object.keys(X).length>0?X:void 0}});var t=V((_0,n)=>{n.exports=function $(D,W){if(D===null||W===null||typeof D!=="object"||typeof W!=="object"||Array.isArray(D)!==Array.isArray(W))return W;var X=JSON.parse(JSON.stringify(D));return Object.keys(W).forEach(function(F){if(D[F]!==void 0)X[F]=$(D[F],W[F]);else X[F]=W[F]}),X}});async function M($,D){const W=await crypto.subtle.importKey("raw",typeof $==="string"?_.encode($):$,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]);return crypto.subtle.sign("HMAC",W,_.encode(D))}async function u($){return crypto.subtle.digest("SHA-256",typeof $==="string"?_.encode($):$)}var P=function($){return Array.prototype.map.call(new Uint8Array($),(D)=>("0"+D.toString(16)).slice(-2)).join("")},h=function($){return $.replace(/[!'()*]/g,(D)=>"%"+D.charCodeAt(0).toString(16).toUpperCase())},F0=function($,D){const{hostname:W,pathname:X}=$;if(W.endsWith(".r2.cloudflarestorage.com"))return["s3","auto"];if(W.endsWith(".backblazeb2.com")){const Z=W.match(/^(?:[^.]+\.)?s3\.([^.]+)\.backblazeb2\.com$/);return Z!=null?["s3",Z[1]]:["",""]}const F=W.replace("dualstack.","").match(/([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(?:\.cn)?$/);let[J,Y]=(F||["",""]).slice(1,3);if(Y==="us-gov")Y="us-gov-west-1";else if(Y==="s3"||Y==="s3-accelerate")Y="us-east-1",J="s3";else if(J==="iot")if(W.startsWith("iot."))J="execute-api";else if(W.startsWith("data.jobs.iot."))J="iot-jobs-data";else J=X==="/mqtt"?"iotdevicegateway":"iotdata";else if(J==="autoscaling"){const Z=(D.get("X-Amz-Target")||"").split(".")[0];if(Z==="AnyScaleFrontendService")J="application-autoscaling";else if(Z==="AnyScaleScalingPlannerFrontendService")J="autoscaling-plans"}else if(Y==null&&J.startsWith("s3-"))Y=J.slice(3).replace(/^fips-|^external-1/,""),J="s3";else if(J.endsWith("-fips"))J=J.slice(0,-5);else if(Y&&/-\d$/.test(J)&&!/-\d$/.test(Y))[J,Y]=[Y,J];return[W0[J]||J,Y]},_=new TextEncoder,W0={appstream2:"appstream",cloudhsmv2:"cloudhsm",email:"ses",marketplace:"aws-marketplace",mobile:"AWSMobileHubService",pinpoint:"mobiletargeting",queue:"sqs","git-codecommit":"codecommit","mturk-requester-sandbox":"mturk-requester","personalize-runtime":"personalize"},X0=new Set(["authorization","content-type","content-length","user-agent","presigned-expires","expect","x-amzn-trace-id","range","connection"]);class E{constructor({accessKeyId:$,secretAccessKey:D,sessionToken:W,service:X,region:F,cache:J,retries:Y,initRetryMs:Z}){if($==null)throw new TypeError("accessKeyId is a required option");if(D==null)throw new TypeError("secretAccessKey is a required option");this.accessKeyId=$,this.secretAccessKey=D,this.sessionToken=W,this.service=X,this.region=F,this.cache=J||new Map,this.retries=Y!=null?Y:10,this.initRetryMs=Z||50}async sign($,D){if($ instanceof Request){const{method:F,url:J,headers:Y,body:Z}=$;if(D=Object.assign({method:F,url:J,headers:Y},D),D.body==null&&Y.has("Content-Type"))D.body=Z!=null&&Y.has("X-Amz-Content-Sha256")?Z:await $.clone().arrayBuffer();$=J}const W=new k(Object.assign({url:$},D,this,D&&D.aws)),X=Object.assign({},D,await W.sign());delete X.aws;try{return new Request(X.url.toString(),X)}catch(F){if(F instanceof TypeError)return new Request(X.url.toString(),Object.assign({duplex:"half"},X));throw F}}async fetch($,D){for(let W=0;W<=this.retries;W++){const X=fetch(await this.sign($,D));if(W===this.retries)return X;const F=await X;if(F.status<500&&F.status!==429)return F;await new Promise((J)=>setTimeout(J,Math.random()*this.initRetryMs*Math.pow(2,W)))}throw new Error("An unknown error occurred, ensure retries is not negative")}}class k{constructor({method:$,url:D,headers:W,body:X,accessKeyId:F,secretAccessKey:J,sessionToken:Y,service:Z,region:B,cache:G,datetime:z,signQuery:a,appendSessionToken:e,allHeaders:$0,singleEncode:D0}){if(D==null)throw new TypeError("url is a required option");if(F==null)throw new TypeError("accessKeyId is a required option");if(J==null)throw new TypeError("secretAccessKey is a required option");this.method=$||(X?"POST":"GET"),this.url=new URL(D),this.headers=new Headers(W||{}),this.body=X,this.accessKeyId=F,this.secretAccessKey=J,this.sessionToken=Y;let K,I;if(!Z||!B)[K,I]=F0(this.url,this.headers);if(this.service=Z||K||"",this.region=B||I||"us-east-1",this.cache=G||new Map,this.datetime=z||(new Date()).toISOString().replace(/[:-]|\.\d{3}/g,""),this.signQuery=a,this.appendSessionToken=e||this.service==="iotdevicegateway",this.headers.delete("Host"),this.service==="s3"&&!this.signQuery&&!this.headers.has("X-Amz-Content-Sha256"))this.headers.set("X-Amz-Content-Sha256","UNSIGNED-PAYLOAD");const N=this.signQuery?this.url.searchParams:this.headers;if(N.set("X-Amz-Date",this.datetime),this.sessionToken&&!this.appendSessionToken)N.set("X-Amz-Security-Token",this.sessionToken);if(this.signableHeaders=["host",...this.headers.keys()].filter((q)=>$0||!X0.has(q)).sort(),this.signedHeaders=this.signableHeaders.join(";"),this.canonicalHeaders=this.signableHeaders.map((q)=>q+":"+(q==="host"?this.url.host:(this.headers.get(q)||"").replace(/\s+/g," "))).join("\n"),this.credentialString=[this.datetime.slice(0,8),this.region,this.service,"aws4_request"].join("/"),this.signQuery){if(this.service==="s3"&&!N.has("X-Amz-Expires"))N.set("X-Amz-Expires","86400");N.set("X-Amz-Algorithm","AWS4-HMAC-SHA256"),N.set("X-Amz-Credential",this.accessKeyId+"/"+this.credentialString),N.set("X-Amz-SignedHeaders",this.signedHeaders)}if(this.service==="s3")try{this.encodedPath=decodeURIComponent(this.url.pathname.replace(/\+/g," "))}catch(q){this.encodedPath=this.url.pathname}else this.encodedPath=this.url.pathname.replace(/\/+/g,"/");if(!D0)this.encodedPath=encodeURIComponent(this.encodedPath).replace(/%2F/g,"/");this.encodedPath=h(this.encodedPath);const R=new Set;this.encodedSearch=[...this.url.searchParams].filter(([q])=>{if(!q)return!1;if(this.service==="s3"){if(R.has(q))return!1;R.add(q)}return!0}).map((q)=>q.map((H)=>h(encodeURIComponent(H)))).sort(([q,H],[v,b])=>q<v?-1:q>v?1:H<b?-1:H>b?1:0).map((q)=>q.join("=")).join("&")}async sign(){if(this.signQuery){if(this.url.searchParams.set("X-Amz-Signature",await this.signature()),this.sessionToken&&this.appendSessionToken)this.url.searchParams.set("X-Amz-Security-Token",this.sessionToken)}else this.headers.set("Authorization",await this.authHeader());return{method:this.method,url:this.url,headers:this.headers,body:this.body}}async authHeader(){return["AWS4-HMAC-SHA256 Credential="+this.accessKeyId+"/"+this.credentialString,"SignedHeaders="+this.signedHeaders,"Signature="+await this.signature()].join(", ")}async signature(){const $=this.datetime.slice(0,8),D=[this.secretAccessKey,$,this.region,this.service].join();let W=this.cache.get(D);if(!W){const X=await M("AWS4"+this.secretAccessKey,$),F=await M(X,this.region),J=await M(F,this.service);W=await M(J,"aws4_request"),this.cache.set(D,W)}return P(await M(W,await this.stringToSign()))}async stringToSign(){return["AWS4-HMAC-SHA256",this.datetime,this.credentialString,P(await u(await this.canonicalString()))].join("\n")}async canonicalString(){return[this.method.toUpperCase(),this.encodedPath,this.encodedSearch,this.canonicalHeaders+"\n",this.signedHeaders,await this.hexBodyHash()].join("\n")}async hexBodyHash(){let $=this.headers.get("X-Amz-Content-Sha256")||(this.service==="s3"&&this.signQuery?"UNSIGNED-PAYLOAD":null);if($==null){if(this.body&&typeof this.body!=="string"&&!("byteLength"in this.body))throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");$=P(await u(this.body||""))}return $}}var m=($,D)=>{const W=D.parseFromString($,"text/xml"),X=W.querySelector("ListBucketResult"),F=W.querySelectorAll("Contents"),J=W.querySelector("CommonPrefixes");if(X===null||F===null)throw new Error("Invalid XML");return{$metadata:{},IsTruncated:X.querySelector("IsTruncated")?.textContent==="true",Contents:Array.from(F).map((Y)=>({ChecksumAlgorithm:[Y.querySelector("ChecksumAlgorithm")?.textContent],ETag:Y.querySelector("ETag")?.textContent,Key:Y.querySelector("Key")?.textContent,LastModified:new Date(Y.querySelector("LastModified")?.textContent),Owner:{DisplayName:Y.querySelector("DisplayName")?.textContent,ID:Y.querySelector("ID")?.textContent},Size:Number.parseInt(Y.querySelector("Size")?.textContent),StorageClass:Y.querySelector("StorageClass")?.textContent})),Name:W.querySelector("Name")?.textContent,Prefix:W.querySelector("Prefix")?.textContent,Delimiter:W.querySelector("Delimiter")?.textContent,MaxKeys:Number.parseInt(W.querySelector("MaxKeys")?.textContent),CommonPrefixes:Array.from(J?J.querySelectorAll("Prefix"):[],(Y)=>({Prefix:Y?.textContent})),EncodingType:W.querySelector("EncodingType")?.textContent,KeyCount:Number.parseInt(W.querySelector("KeyCount")?.textContent),ContinuationToken:W.querySelector("ContinuationToken")?.textContent,NextContinuationToken:W.querySelector("NextContinuationToken")?.textContent,StartAfter:W.querySelector("StartAfter")?.textContent}};class w{client;endpoint;parser;constructor($,D,W){this.client=$,this.endpoint=D,this.parser=W}async listObjectV2($){const D=`${this.endpoint}/${$.Bucket}?list-type=2&prefix=${$.Prefix}`,X=await(await this.client.fetch(D,{})).text();return m(X,this.parser)}async putObject($){const D=`${this.endpoint}/${$.Bucket}/${$.Key}?${new URLSearchParams({...$.ChecksumSHA256&&{"x-amz-content-sha256":$.ChecksumSHA256}}).toString()}}`,W=await this.client.fetch(D,{method:"PUT",body:$.Body});if(W.status!=200)throw new Error(`Failed to PUT: ${await W.text()}`);return{$metadata:{httpStatusCode:W.status},ETag:W.headers.get("ETag"),...W.headers.get("x-amz-version-id")&&{VersionId:W.headers.get("x-amz-version-id")}}}async deleteObject($){const D=`${this.endpoint}/${$.Bucket}/${$.Key}`;return{$metadata:{httpStatusCode:(await this.client.fetch(D,{method:"DELETE"})).status}}}async getObject($){const D=`${this.endpoint}/${$.Bucket}/${$.Key}?${$.VersionId?`versionId=${$.VersionId}`:""}`,W=await this.client.fetch(D,{method:"GET",headers:{"If-None-Match":$.IfNoneMatch}});if(W.status==304){const F=new Error;throw F.name="304",F}const X=W.status==404?void 0:await W.json();return{$metadata:{httpStatusCode:W.status},Body:X,ETag:W.headers.get("ETag"),...W.headers.get("x-amz-version-id")&&{VersionId:W.headers.get("x-amz-version-id")}}}}class O{key;_vals;_keys;constructor($,D){if(this.key=$,this._vals=new Map,this._keys=new Map,D)for(let[W,X]of D)this.set(W,X)}get size(){return this._vals.size}set($,D){const W=this.key($);return this._vals.set(W,D),this._keys.set(W,$),this}get($){return this._vals.get(this.key($))}delete($){const D=this.key($);return this._keys.delete(D),this._vals.delete(D)}has($){return this._vals.has(this.key($))}values(){return this._vals.values()}keys(){return this._keys.values()}forEach($){return this._vals.forEach((D,W,X)=>$(D,this._keys.get(W)))}}var x=()=>`${Date.now()-200}`.padStart(14,"0"),y=()=>`${Date.now()+200}`.padStart(14,"0");var j=()=>crypto.randomUUID();var Q=($)=>`${$.bucket}/${$.key}`;var U=p(),G0=i(),Q0=t();var C={previous:".",files:{},update:{}};class s{ref;handler;lastVersion;queue=Promise.resolve();constructor($,D){this.ref=$,this.handler=D}notify($,D,W){this.queue=this.queue.then(()=>W).then((X)=>{if(D===this.lastVersion)return;else console.log(`${$} NOTIFY ${Q(this.ref)} ${D}`),this.lastVersion=D,this.handler(X)})}}class S{service;ref;subscribers=new Set;poller;cache;pollInProgress=!1;authoritative_key="";authoritative_state=C;optimistic_state=C;pendingWrites=new Map;writtenOperations=new Map;constructor($,D,W){this.service=$,this.ref=D}observeVersionId($){if(this.writtenOperations.has($)){const D=this.writtenOperations.get($);this.pendingWrites.delete(D),this.writtenOperations.delete($)}}async get(){return this.getLatest().then(($)=>$||this.cache?.data)}async getLatest(){try{const $=await this.service._getObject({operation:"POLL_TIME",ref:this.ref,ifNoneMatch:this.cache?.etag});if($.$metadata.httpStatusCode===304)return;if($.data===void 0)this.authoritative_key=".";else this.authoritative_key=$.data;const D=await this.service.s3ClientLite.listObjectV2({Bucket:this.ref.bucket,Prefix:this.ref.key,StartAfter:this.authoritative_key});if(D.Contents===void 0)return this.authoritative_state=C,this.optimistic_state=C,this.authoritative_state;for(let W=D.Contents.length-1;W>=0;W--){const X=D.Contents[W].Key;if(X==this.ref.key)continue;const F=x(),J=await this.service._getObject({operation:"LOOK_BACK",ref:{bucket:this.ref.bucket,key:X}});if(J.data===void 0)throw new Error("empty data");if(J.data.previous<F){this.authoritative_key=J.data.previous,this.authoritative_state=J.data;break}}for(let W=0;W<D.Contents.length;W++){const X=D.Contents[W].Key;if(X==this.ref.key)continue;const F=await this.service._getObject({operation:"SWEEP",ref:{bucket:this.ref.bucket,key:X}}),J=X.substring(X.lastIndexOf("@")+1),Y=x();if(X<this.authoritative_key);else if(J>=Y)this.optimistic_state=U(this.optimistic_state,F.data?.update);else this.authoritative_state=U(this.authoritative_state,F.data?.update),this.authoritative_key=X;this.observeVersionId(J)}return this.authoritative_state}catch($){if($.name==="NoSuchKey")return this.authoritative_state=C,this.authoritative_state;else throw $}}async poll(){if(this.pollInProgress)return;if(this.pollInProgress=!0,this.subscriberCount===0&&this.poller)clearInterval(this.poller),this.poller=void 0;if(this.subscriberCount>0&&!this.poller)this.poller=setInterval(()=>this.poll(),this.service.config.pollFrequency);const $=await this.getLatest();if($===void 0){this.pollInProgress=!1;return}this.subscribers.forEach(async(D)=>{const W=$.files[Q(D.ref)];if(W){const X=this.service._getObject({operation:"GET_CONTENT",ref:D.ref,version:W.version});D.notify(this.service.config.label,W.version,X.then((F)=>F.data))}else if(W===null)D.notify(this.service.config.label,void 0,Promise.resolve(void 0))}),this.pollInProgress=!1}async updateContent($,D){this.pendingWrites.set(D,$);try{const W=await D,X=await this.get();X.previous=this.authoritative_key,X.update={files:{}};for(let[Z,B]of W){const G=Q(Z);if(B){const z={version:B};X.update.files[G]=z}else X.update.files[G]=null}const F=y()+"_"+j().substring(0,2),J=this.ref.key+"@"+F;await this.service._putObject({operation:"PUT_MANIFEST",ref:{key:J,bucket:this.ref.bucket},value:X});const Y=await this.service._putObject({operation:"PUT_POLL",ref:{key:this.ref.key,bucket:this.ref.bucket},value:this.authoritative_key});return this.writtenOperations.set(F,D),this.poll(),Y}catch(W){throw console.error(W),this.pendingWrites.delete(D),W}}async getOptimisticVersion($){return await this.get(),this.optimistic_state.files[Q($)]?.version}subscribe($,D){console.log(`SUBSCRIBE ${Q($)} ${this.subscriberCount+1}`);const W=new s($,D);return this.subscribers.add(W),()=>this.subscribers.delete(W)}get subscriberCount(){return this.subscribers.size}}async function r($){const D=(new TextEncoder()).encode($),W=await crypto.subtle.digest("SHA-256",D);return btoa(String.fromCharCode(...new Uint8Array(W)))}class z0{config;s3ClientLite;manifests=new O(Q);getCache=new O(($)=>`${$.Bucket}${$.Key}${$.VersionId}${$.IfNoneMatch}`);constructor($){if(this.config={...$,label:$.label||j().substring(0,3),useChecksum:$.useChecksum===!1?!1:!0,useVersioning:$.useVersioning||!1,pollFrequency:$.pollFrequency||1000,defaultManifest:{bucket:$.defaultManifest?.bucket||$.defaultBucket,key:$.defaultManifest?.key||"manifest.json"}},this.config.s3Config?.credentials instanceof Function)throw Error("We can't do that yet");const D=$.s3Config.endpoint||`https://s3.${$.s3Config.region}.amazonaws.com`;this.s3ClientLite=new w(new E({accessKeyId:this.config.s3Config?.credentials?.accessKeyId,secretAccessKey:this.config.s3Config?.credentials?.secretAccessKey,sessionToken:this.config.s3Config?.credentials?.sessionToken,service:"s3",retries:0}),D,$.parser||new DOMParser)}getOrCreateManifest($){if(!this.manifests.has($))this.manifests.set($,new S(this,$));return this.manifests.get($)}async get($,D={}){const W={...this.config.defaultManifest,...D.manifest},X=this.getOrCreateManifest(W),F={bucket:$.bucket||this.config.defaultBucket||this.config.defaultManifest.bucket,key:typeof $==="string"?$:$.key};let J=!1,Y=void 0;for(let[B,G]of X.pendingWrites)if(G.has(F))J=!0,Y=G.get(F);if(J)return console.log(`${this.config.label} get (cached) ${Q(F)}`),Y;const Z=await X.getOptimisticVersion(F);if(Z===void 0)return;return(await this._getObject({operation:"GET",ref:F,version:Z})).data}async _getObject($){let D;if(this.config.useVersioning)D={Bucket:$.ref.bucket,Key:$.ref.key,IfNoneMatch:$.ifNoneMatch,...$.version&&{VersionId:$.version}};else D={Bucket:$.ref.bucket,Key:`${$.ref.key}${$.version?`@${$.version}`:""}`,IfNoneMatch:$.ifNoneMatch};if(this.getCache.has(D))return await this.getCache.get(D);const W=this.s3ClientLite.getObject(D).then(async(X)=>{const F={...X,data:X.Body};return console.log(`${this.config.label} ${$.operation} ${$.ref.bucket}/${$.ref.key}@${$.version} => ${F.VersionId} ${F.data}}`),this.getCache.set(D,W),F}).catch((X)=>{if(X?.name==="304")return{$metadata:{httpStatusCode:304},data:void 0};else throw X});return W}async delete($,D={}){return this.putAll(new Map([[$,void 0]]),D)}async put($,D,W={}){return this.putAll(new Map([[$,D]]),W)}async putAll($,D={}){const W=new O(Q,[...$].map(([F,J])=>[{bucket:F.bucket||this.config.defaultBucket||this.config.defaultManifest.bucket,key:typeof F==="string"?F:F.key},J])),X=(D?.manifests||[this.config.defaultManifest]).map((F)=>({...this.config.defaultManifest,...F}));return this._putAll(W,{manifests:X})}async _putAll($,D){const W=new Promise(async(X,F)=>{const J=new Map,Y=[];$.forEach((Z,B)=>{if(Z!==void 0){let G=this.config.useVersioning?void 0:j();Y.push(this._putObject({operation:"PUT_CONTENT",ref:B,value:Z,version:G}).then((z)=>{if(this.config.useVersioning)if(z.VersionId===void 0)throw console.error(z),Error(`Bucket ${B.bucket} is not version enabled!`);else G=z.VersionId;J.set(B,G)}))}else Y.push(this._deleteObject({ref:B}).then((G)=>{J.set(B,void 0)}))}),await Promise.all(Y).catch(F),X(J)});return Promise.all(D.manifests.map((X)=>{return this.getOrCreateManifest(X).updateContent($,W)}))}async _putObject($){const D=JSON.stringify($.value,null,2);let W;if(this.config.useVersioning)W={Bucket:$.ref.bucket,Key:$.ref.key,ContentType:"application/json",Body:D,...this.config.useChecksum&&{ChecksumSHA256:await r(D)}};else W={Bucket:$.ref.bucket,Key:`${$.ref.key}${$.version?`@${$.version}`:""}`,ContentType:"application/json",Body:D,...this.config.useChecksum&&{ChecksumSHA256:await r(D)}};const X=await this.s3ClientLite.putObject(W);return console.log(`${this.config.label} ${$.operation} ${W.Bucket}/${W.Key} => ${X.VersionId}`),X}async _deleteObject($){const D={Bucket:$.ref.bucket,Key:$.ref.key},W=await this.s3ClientLite.deleteObject(D);return console.log(`${this.config.label} DELETE ${$.ref.bucket}/${$.ref.key} => ${W.VersionId}`),W}subscribe($,D,W){const X={...this.config.defaultManifest,...W?.manifest},F={key:typeof $==="string"?$:$.key,bucket:$.bucket||this.config.defaultBucket||X.bucket},J=this.getOrCreateManifest(X),Y=J.subscribe(F,D);return this.get(F,{manifest:X}).then((Z)=>{console.log(`${this.config.label} NOTIFY (initial) ${Q(F)}`),queueMicrotask(()=>{D(Z),J.poll()})}),Y}refresh(){return Promise.all([...this.manifests.values()].map(($)=>$.poll()))}get subscriberCount(){return[...this.manifests.values()].reduce(($,D)=>$+D.subscriberCount,0)}}export{z0 as MPS3};
