var q=(D,W)=>()=>(W||D((W={exports:{}}).exports,W),W.exports);var T=q((B0,d)=>{B0.serialize=function(D){return D&&typeof D.toJSON==="function"?D.toJSON():D}});var f=q((K0,p)=>{var l=T().serialize;p.exports=function D(W,X){if(X=l(X),X===null||typeof X!=="object"||Array.isArray(X))return X;if(W=l(W),W===null||typeof W!=="object"||Array.isArray(W))W={};var $=Object.keys(X);for(var J=0;J<$.length;J++){var Y=$[J];if(Y==="__proto__"||Y==="constructor"||Y==="prototype")return W;if(X[Y]===null){if(W.hasOwnProperty(Y))delete W[Y]}else W[Y]=D(W[Y],X[Y])}return W}});var c=q((S0,o)=>{o.exports=function D(W,X){if(W===X)return!0;if(W&&X&&typeof W=="object"&&typeof X=="object"){if(W.constructor!==X.constructor)return!1;var $,J,Y;if(Array.isArray(W)){if($=W.length,$!=X.length)return!1;for(J=$;J--!==0;)if(!D(W[J],X[J]))return!1;return!0}if(W.constructor===RegExp)return W.source===X.source&&W.flags===X.flags;if(W.valueOf!==Object.prototype.valueOf)return W.valueOf()===X.valueOf();if(W.toString!==Object.prototype.toString)return W.toString()===X.toString();if(Y=Object.keys(W),$=Y.length,$!==Object.keys(X).length)return!1;for(J=$;J--!==0;)if(!Object.prototype.hasOwnProperty.call(X,Y[J]))return!1;for(J=$;J--!==0;){var Z=Y[J];if(!D(W[Z],X[Z]))return!1}return!0}return W!==W&&X!==X}});var n=q((I0,i)=>{var Q0=function(D,W){if(D.length!==W.length)return!1;for(var X=0;X<D.length;X++)if(!G0(W[X],D[X]))return!1;return!0},G0=c(),P=T().serialize;i.exports=function D(W,X){if(W=P(W),X=P(X),W===null||X===null||typeof W!=="object"||typeof X!=="object"||Array.isArray(W)!==Array.isArray(X))return X;if(Array.isArray(W)){if(!Q0(W,X))return X;return}var $={},J=Object.keys(W),Y=Object.keys(X),Z,B,Q={};for(B=0;B<Y.length;B++)if(Z=Y[B],J.indexOf(Z)===-1)Q[Z]=!0,$[Z]=P(X[Z]);var N={};for(B=0;B<J.length;B++)if(Z=J[B],Y.indexOf(Z)===-1)N[Z]=!0,$[Z]=null;else if(W[Z]!==null&&typeof W[Z]==="object"){var z=D(W[Z],X[Z]);if(z!==void 0)$[Z]=z}else if(W[Z]!==X[Z])$[Z]=P(X[Z]);return Object.keys($).length>0?$:void 0}});var s=q((R0,t)=>{t.exports=function D(W,X){if(W===null||X===null||typeof W!=="object"||typeof X!=="object"||Array.isArray(W)!==Array.isArray(X))return X;var $=JSON.parse(JSON.stringify(W));return Object.keys(X).forEach(function(J){if(W[J]!==void 0)$[J]=D(W[J],X[J]);else $[J]=X[J]}),$}});async function O(D,W){const X=await crypto.subtle.importKey("raw",typeof D==="string"?E.encode(D):D,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]);return crypto.subtle.sign("HMAC",X,E.encode(W))}async function b(D){return crypto.subtle.digest("SHA-256",typeof D==="string"?E.encode(D):D)}var _=function(D){return Array.prototype.map.call(new Uint8Array(D),(W)=>("0"+W.toString(16)).slice(-2)).join("")},u=function(D){return D.replace(/[!'()*]/g,(W)=>"%"+W.charCodeAt(0).toString(16).toUpperCase())},Y0=function(D,W){const{hostname:X,pathname:$}=D;if(X.endsWith(".r2.cloudflarestorage.com"))return["s3","auto"];if(X.endsWith(".backblazeb2.com")){const B=X.match(/^(?:[^.]+\.)?s3\.([^.]+)\.backblazeb2\.com$/);return B!=null?["s3",B[1]]:["",""]}const J=X.replace("dualstack.","").match(/([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(?:\.cn)?$/);let[Y,Z]=(J||["",""]).slice(1,3);if(Z==="us-gov")Z="us-gov-west-1";else if(Z==="s3"||Z==="s3-accelerate")Z="us-east-1",Y="s3";else if(Y==="iot")if(X.startsWith("iot."))Y="execute-api";else if(X.startsWith("data.jobs.iot."))Y="iot-jobs-data";else Y=$==="/mqtt"?"iotdevicegateway":"iotdata";else if(Y==="autoscaling"){const B=(W.get("X-Amz-Target")||"").split(".")[0];if(B==="AnyScaleFrontendService")Y="application-autoscaling";else if(B==="AnyScaleScalingPlannerFrontendService")Y="autoscaling-plans"}else if(Z==null&&Y.startsWith("s3-"))Z=Y.slice(3).replace(/^fips-|^external-1/,""),Y="s3";else if(Y.endsWith("-fips"))Y=Y.slice(0,-5);else if(Z&&/-\d$/.test(Y)&&!/-\d$/.test(Z))[Y,Z]=[Z,Y];return[$0[Y]||Y,Z]},E=new TextEncoder,$0={appstream2:"appstream",cloudhsmv2:"cloudhsm",email:"ses",marketplace:"aws-marketplace",mobile:"AWSMobileHubService",pinpoint:"mobiletargeting",queue:"sqs","git-codecommit":"codecommit","mturk-requester-sandbox":"mturk-requester","personalize-runtime":"personalize"},J0=new Set(["authorization","content-type","content-length","user-agent","presigned-expires","expect","x-amzn-trace-id","range","connection"]);class U{constructor({accessKeyId:D,secretAccessKey:W,sessionToken:X,service:$,region:J,cache:Y,retries:Z,initRetryMs:B}){if(D==null)throw new TypeError("accessKeyId is a required option");if(W==null)throw new TypeError("secretAccessKey is a required option");this.accessKeyId=D,this.secretAccessKey=W,this.sessionToken=X,this.service=$,this.region=J,this.cache=Y||new Map,this.retries=Z!=null?Z:10,this.initRetryMs=B||50}async sign(D,W){if(D instanceof Request){const{method:J,url:Y,headers:Z,body:B}=D;if(W=Object.assign({method:J,url:Y,headers:Z},W),W.body==null&&Z.has("Content-Type"))W.body=B!=null&&Z.has("X-Amz-Content-Sha256")?B:await D.clone().arrayBuffer();D=Y}const X=new k(Object.assign({url:D},W,this,W&&W.aws)),$=Object.assign({},W,await X.sign());delete $.aws;try{return new Request($.url.toString(),$)}catch(J){if(J instanceof TypeError)return new Request($.url.toString(),Object.assign({duplex:"half"},$));throw J}}async fetch(D,W){for(let X=0;X<=this.retries;X++){const $=fetch(await this.sign(D,W));if(X===this.retries)return $;const J=await $;if(J.status<500&&J.status!==429)return J;await new Promise((Y)=>setTimeout(Y,Math.random()*this.initRetryMs*Math.pow(2,X)))}throw new Error("An unknown error occurred, ensure retries is not negative")}}class k{constructor({method:D,url:W,headers:X,body:$,accessKeyId:J,secretAccessKey:Y,sessionToken:Z,service:B,region:Q,cache:N,datetime:z,signQuery:e,appendSessionToken:D0,allHeaders:W0,singleEncode:X0}){if(W==null)throw new TypeError("url is a required option");if(J==null)throw new TypeError("accessKeyId is a required option");if(Y==null)throw new TypeError("secretAccessKey is a required option");this.method=D||($?"POST":"GET"),this.url=new URL(W),this.headers=new Headers(X||{}),this.body=$,this.accessKeyId=J,this.secretAccessKey=Y,this.sessionToken=Z;let S,I;if(!B||!Q)[S,I]=Y0(this.url,this.headers);if(this.service=B||S||"",this.region=Q||I||"us-east-1",this.cache=N||new Map,this.datetime=z||(new Date()).toISOString().replace(/[:-]|\.\d{3}/g,""),this.signQuery=e,this.appendSessionToken=D0||this.service==="iotdevicegateway",this.headers.delete("Host"),this.service==="s3"&&!this.signQuery&&!this.headers.has("X-Amz-Content-Sha256"))this.headers.set("X-Amz-Content-Sha256","UNSIGNED-PAYLOAD");const j=this.signQuery?this.url.searchParams:this.headers;if(j.set("X-Amz-Date",this.datetime),this.sessionToken&&!this.appendSessionToken)j.set("X-Amz-Security-Token",this.sessionToken);if(this.signableHeaders=["host",...this.headers.keys()].filter((F)=>W0||!J0.has(F)).sort(),this.signedHeaders=this.signableHeaders.join(";"),this.canonicalHeaders=this.signableHeaders.map((F)=>F+":"+(F==="host"?this.url.host:(this.headers.get(F)||"").replace(/\s+/g," "))).join("\n"),this.credentialString=[this.datetime.slice(0,8),this.region,this.service,"aws4_request"].join("/"),this.signQuery){if(this.service==="s3"&&!j.has("X-Amz-Expires"))j.set("X-Amz-Expires","86400");j.set("X-Amz-Algorithm","AWS4-HMAC-SHA256"),j.set("X-Amz-Credential",this.accessKeyId+"/"+this.credentialString),j.set("X-Amz-SignedHeaders",this.signedHeaders)}if(this.service==="s3")try{this.encodedPath=decodeURIComponent(this.url.pathname.replace(/\+/g," "))}catch(F){this.encodedPath=this.url.pathname}else this.encodedPath=this.url.pathname.replace(/\/+/g,"/");if(!X0)this.encodedPath=encodeURIComponent(this.encodedPath).replace(/%2F/g,"/");this.encodedPath=u(this.encodedPath);const R=new Set;this.encodedSearch=[...this.url.searchParams].filter(([F])=>{if(!F)return!1;if(this.service==="s3"){if(R.has(F))return!1;R.add(F)}return!0}).map((F)=>F.map((V)=>u(encodeURIComponent(V)))).sort(([F,V],[v,h])=>F<v?-1:F>v?1:V<h?-1:V>h?1:0).map((F)=>F.join("=")).join("&")}async sign(){if(this.signQuery){if(this.url.searchParams.set("X-Amz-Signature",await this.signature()),this.sessionToken&&this.appendSessionToken)this.url.searchParams.set("X-Amz-Security-Token",this.sessionToken)}else this.headers.set("Authorization",await this.authHeader());return{method:this.method,url:this.url,headers:this.headers,body:this.body}}async authHeader(){return["AWS4-HMAC-SHA256 Credential="+this.accessKeyId+"/"+this.credentialString,"SignedHeaders="+this.signedHeaders,"Signature="+await this.signature()].join(", ")}async signature(){const D=this.datetime.slice(0,8),W=[this.secretAccessKey,D,this.region,this.service].join();let X=this.cache.get(W);if(!X){const $=await O("AWS4"+this.secretAccessKey,D),J=await O($,this.region),Y=await O(J,this.service);X=await O(Y,"aws4_request"),this.cache.set(W,X)}return _(await O(X,await this.stringToSign()))}async stringToSign(){return["AWS4-HMAC-SHA256",this.datetime,this.credentialString,_(await b(await this.canonicalString()))].join("\n")}async canonicalString(){return[this.method.toUpperCase(),this.encodedPath,this.encodedSearch,this.canonicalHeaders+"\n",this.signedHeaders,await this.hexBodyHash()].join("\n")}async hexBodyHash(){let D=this.headers.get("X-Amz-Content-Sha256")||(this.service==="s3"&&this.signQuery?"UNSIGNED-PAYLOAD":null);if(D==null){if(this.body&&typeof this.body!=="string"&&!("byteLength"in this.body))throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");D=_(await b(this.body||""))}return D}}var y=(D,W)=>{const X=W.parseFromString(D,"text/xml"),$=X.getElementsByTagName("ListBucketResult")[0],J=X.getElementsByTagName("Contents"),Y=X.getElementsByTagName("CommonPrefixes")[0];if(!$||!J)throw new Error(`Invalid XML: ${D}`);return{$metadata:{},IsTruncated:$.getElementsByTagName("IsTruncated")[0]?.textContent==="true",Contents:Array.from(J).map((Z)=>({ChecksumAlgorithm:[Z.getElementsByTagName("ChecksumAlgorithm")[0]?.textContent],ETag:Z.getElementsByTagName("ETag")[0]?.textContent,Key:Z.getElementsByTagName("Key")[0]?.textContent,LastModified:new Date(Z.getElementsByTagName("LastModified")[0]?.textContent),Owner:{DisplayName:Z.getElementsByTagName("DisplayName")[0]?.textContent,ID:Z.getElementsByTagName("ID")[0]?.textContent},Size:Number.parseInt(Z.getElementsByTagName("Size")[0]?.textContent),StorageClass:Z.getElementsByTagName("StorageClass")[0]?.textContent})),Name:X.getElementsByTagName("Name")[0]?.textContent,Prefix:X.getElementsByTagName("Prefix")[0]?.textContent,Delimiter:X.getElementsByTagName("Delimiter")[0]?.textContent,MaxKeys:Number.parseInt(X.getElementsByTagName("MaxKeys")[0]?.textContent),CommonPrefixes:Array.from(Y?Y.getElementsByTagName("Prefix"):[],(Z)=>({Prefix:Z?.textContent})),EncodingType:X.getElementsByTagName("EncodingType")[0]?.textContent,KeyCount:Number.parseInt(X.getElementsByTagName("KeyCount")[0]?.textContent),ContinuationToken:X.getElementsByTagName("ContinuationToken")[0]?.textContent,NextContinuationToken:X.getElementsByTagName("NextContinuationToken")[0]?.textContent,StartAfter:X.getElementsByTagName("StartAfter")[0]?.textContent}};class w{client;endpoint;parser;constructor(D,W,X){this.client=D,this.endpoint=W,this.parser=X}async listObjectV2(D){for(let W=0;W<10;W++){const X=`${this.endpoint}/${D.Bucket}/?list-type=2&prefix=${D.Prefix}`,$=await this.client(X,{});if($.status===200){const J=await $.text();return y(J,this.parser)}else if($.status===429)console.warn("listObjectV2: 429, retrying"),await new Promise((J)=>setTimeout(J,1000));else throw new Error(`Unexpected response: ${$.status} ${$.text()}`)}throw new Error("Cannot contact server")}async putObject(D){const W=`${this.endpoint}/${D.Bucket}/${D.Key}`,X=await this.client(W,{method:"PUT",body:D.Body,headers:{"Content-Type":"application/json",...D.ChecksumSHA256&&{"x-amz-content-sha256":D.ChecksumSHA256}}});if(X.status!=200)throw new Error(`Failed to PUT: ${await X.text()}`);return{$metadata:{httpStatusCode:X.status},ETag:X.headers.get("ETag"),...X.headers.get("x-amz-version-id")&&{VersionId:X.headers.get("x-amz-version-id")}}}async deleteObject(D){const W=`${this.endpoint}/${D.Bucket}/${D.Key}`;return{$metadata:{httpStatusCode:(await this.client(W,{method:"DELETE"})).status}}}async getObject(D){const W=`${this.endpoint}/${D.Bucket}/${D.Key}?${D.VersionId?`versionId=${D.VersionId}`:""}`,X=await this.client(W,{method:"GET",headers:{"If-None-Match":D.IfNoneMatch}});if(X.status==304){const J=new Error;throw J.name="304",J}let $;if(X.status==404)$=void 0;else if(X.status==403)throw new Error("Access denied");else if(X.headers.get("content-type")==="application/json")$=await X.json();else{const J=await X.text();if(J==="")$=void 0;else try{$=JSON.parse(J)}catch(Y){throw new Error(`Failed to parse response as JSON ${W}`)}}return{$metadata:{httpStatusCode:X.status},Body:$,ETag:X.headers.get("ETag"),...X.headers.get("x-amz-version-id")&&{VersionId:X.headers.get("x-amz-version-id")}}}}class C{key;_vals;_keys;constructor(D,W){if(this.key=D,this._vals=new Map,this._keys=new Map,W)for(let[X,$]of W)this.set(X,$)}get size(){return this._vals.size}set(D,W){const X=this.key(D);return this._vals.set(X,W),this._keys.set(X,D),this}get(D){return this._vals.get(this.key(D))}delete(D){const W=this.key(D);return this._keys.delete(W),this._vals.delete(W)}has(D){return this._vals.has(this.key(D))}values(){return this._vals.values()}keys(){return this._keys.values()}forEach(D){return this._vals.forEach((W,X,$)=>D(W,this._keys.get(X)))}}var m=()=>`${Date.now()-200}`.padStart(14,"0"),g=()=>`${Date.now()+200}`.padStart(14,"0");var H=()=>crypto.randomUUID();var G=(D)=>`${D.bucket}/${D.key}`;class A{pendingWrites=new Map;writtenOperations=new Map;observeVersionId(D){if(this.writtenOperations.has(D)){const W=this.writtenOperations.get(D);this.pendingWrites.delete(W),this.writtenOperations.delete(D)}}flatten(){const D=new Map;return this.pendingWrites.forEach((W)=>{W.forEach((X,$)=>{D.set(G($),X)})}),D}}var L=f(),N0=n(),z0=s();var M={previous:".",files:{},update:{}};class a{ref;handler;lastVersion;queue=Promise.resolve();constructor(D,W){this.ref=D,this.handler=W}notify(D,W,X){this.queue=this.queue.then(()=>X).then(($)=>{if(W===this.lastVersion)return;else console.log(`${D} NOTIFY ${G(this.ref)} ${W}`),this.lastVersion=W,this.handler($)})}}class K{service;ref;subscribers=new Set;poller;cache;pollInProgress=!1;authoritative_key="";authoritative_state=JSON.parse(JSON.stringify(M));optimistic_state=JSON.parse(JSON.stringify(M));operation_queue=new A;constructor(D,W,X){console.log("New manifest",W),this.service=D,this.ref=W}observeVersionId(D){this.operation_queue.observeVersionId(D)}async get(){return this.getLatest().then((D)=>D||this.cache?.data)}async getLatest(){try{const D=await this.service._getObject({operation:"POLL_TIME",ref:this.ref,ifNoneMatch:this.cache?.etag});if(D.$metadata.httpStatusCode===304)return;if(D.data===void 0)this.authoritative_key=".";else this.authoritative_key=D.data;const W=await this.service.s3ClientLite.listObjectV2({Bucket:this.ref.bucket,Prefix:this.ref.key,StartAfter:this.authoritative_key});if(W.Contents===void 0)return this.authoritative_state=JSON.parse(JSON.stringify(M)),this.optimistic_state=JSON.parse(JSON.stringify(M)),this.authoritative_state;const X=`${this.ref.key}@${m()}`;for(let $=W.Contents.length-1;$>=0;$--){const J=W.Contents[$].Key;if(J==this.ref.key)continue;const Y={bucket:this.ref.bucket,key:J},Z=await this.service._getObject({operation:"LOOK_BACK",ref:Y});if(Z.data===void 0){await this.service._deleteObject({operation:"CLEANUP",ref:Y});continue}if(Z.data.previous<X){this.authoritative_key=Z.data.previous,this.authoritative_state=Z.data;break}}for(let $=0;$<W.Contents.length;$++){const J=W.Contents[$].Key;if(J==this.ref.key)continue;if(J<this.authoritative_key)continue;const Y=await this.service._getObject({operation:"SWEEP",ref:{bucket:this.ref.bucket,key:J}}),Z=J.substring(J.lastIndexOf("@")+1);if(Z>=X)console.log("Optimistic update"),this.optimistic_state=L(this.optimistic_state,Y.data?.update);else this.authoritative_state=L(this.authoritative_state,Y.data?.update),this.optimistic_state=L(this.optimistic_state,Y.data?.update),this.authoritative_key=J;this.observeVersionId(Z)}return this.authoritative_state}catch(D){if(D.name==="NoSuchKey")return this.authoritative_state=M,this.authoritative_state;else throw D}}async poll(){if(this.pollInProgress)return;if(this.pollInProgress=!0,this.subscriberCount===0&&this.poller)clearInterval(this.poller),this.poller=void 0;if(this.subscriberCount>0&&!this.poller)this.poller=setInterval(()=>this.poll(),this.service.config.pollFrequency);const D=await this.getLatest();if(D===void 0){this.pollInProgress=!1;return}const W=this.operation_queue.flatten();this.subscribers.forEach(async(X)=>{if(W.has(G(X.ref)))X.notify(this.service.config.label,"local",Promise.resolve(W.get(G(X.ref))));else{const $=D.files[G(X.ref)];if($){const J=this.service._getObject({operation:"GET_CONTENT",ref:X.ref,version:$.version});X.notify(this.service.config.label,$.version,J.then((Y)=>Y.data))}else if($===null)X.notify(this.service.config.label,void 0,Promise.resolve(void 0))}}),this.pollInProgress=!1}async updateContent(D,W){const X=await W,$=await this.get();$.previous=this.authoritative_key,$.update={files:{}};for(let[Z,B]of X){const Q=G(Z);if(B){const N={version:B};$.update.files[Q]=N}else $.update.files[Q]=null}const J=g()+"_"+H().substring(0,2);this.operation_queue.pendingWrites.set(W,D),this.operation_queue.writtenOperations.set(J,W);const Y=this.ref.key+"@"+J;try{await this.service._putObject({operation:"PUT_MANIFEST",ref:{key:Y,bucket:this.ref.bucket},value:$});const Z=await this.service._putObject({operation:"PUT_POLL",ref:{key:this.ref.key,bucket:this.ref.bucket},value:this.authoritative_key});return this.poll(),Z}catch(Z){throw console.error(Z),this.operation_queue.pendingWrites.delete(W),this.operation_queue.writtenOperations.delete(J),Z}}async getOptimisticVersion(D){return await this.get(),this.optimistic_state.files[G(D)]?.version}subscribe(D,W){console.log(`SUBSCRIBE ${G(D)} ${this.subscriberCount+1}`);const X=new a(D,W);return this.subscribers.add(X),()=>this.subscribers.delete(X)}get subscriberCount(){return this.subscribers.size}}async function r(D){const W=(new TextEncoder()).encode(D),X=await crypto.subtle.digest("SHA-256",W);return[...new Uint8Array(X)].map(($)=>$.toString(16).padStart(2,"0")).join("")}class j0{config;s3ClientLite;manifests=new C(G);getCache=new C((D)=>`${D.Bucket}${D.Key}${D.VersionId}${D.IfNoneMatch}`);constructor(D){if(this.config={...D,label:D.label||H().substring(0,3),useChecksum:D.useChecksum===!1?!1:!0,useVersioning:D.useVersioning||!1,pollFrequency:D.pollFrequency||1000,defaultManifest:{bucket:D.defaultManifest?.bucket||D.defaultBucket,key:typeof D.defaultManifest=="string"?D.defaultManifest:D.defaultManifest?.key||"manifest.json"}},this.config.s3Config?.credentials instanceof Function)throw Error("We can't do that yet");const W=D.s3Config.endpoint||`https://s3.${D.s3Config.region}.amazonaws.com`;let X;if(this.config.s3Config?.credentials){const $=new U({accessKeyId:this.config.s3Config.credentials.accessKeyId,secretAccessKey:this.config.s3Config.credentials.secretAccessKey,sessionToken:this.config.s3Config.credentials.sessionToken,region:this.config.s3Config.region||"us-east-1",service:"s3",retries:0});X=(...J)=>$.fetch(...J)}else X=(global||window).fetch.bind(global||window);this.s3ClientLite=new w(X,W,D.parser||new DOMParser)}getOrCreateManifest(D){if(!this.manifests.has(D))this.manifests.set(D,new K(this,D));return this.manifests.get(D)}async get(D,W={}){const X={...this.config.defaultManifest,...W.manifest},$=this.getOrCreateManifest(X),J={bucket:D.bucket||this.config.defaultBucket||this.config.defaultManifest.bucket,key:typeof D==="string"?D:D.key},Y=$.operation_queue.flatten(),Z=G(J);if(Y.has(Z))return console.log(`${this.config.label} get (cached) ${G(J)}`),Y.get(Z);const B=await $.getOptimisticVersion(J);if(B===void 0)return;return(await this._getObject({operation:"GET",ref:J,version:B})).data}async _getObject(D){let W;if(this.config.useVersioning)W={Bucket:D.ref.bucket,Key:D.ref.key,IfNoneMatch:D.ifNoneMatch,...D.version&&{VersionId:D.version}};else W={Bucket:D.ref.bucket,Key:`${D.ref.key}${D.version?`@${D.version}`:""}`,IfNoneMatch:D.ifNoneMatch};if(this.getCache.has(W))return await this.getCache.get(W);const X=this.s3ClientLite.getObject(W).then(async($)=>{const J={...$,data:$.Body};return console.log(`${this.config.label} ${D.operation} ${D.ref.bucket}/${D.ref.key}@${D.version} => ${J.VersionId}`),this.getCache.set(W,X),J}).catch(($)=>{if($?.name==="304")return{$metadata:{httpStatusCode:304},data:void 0};else throw $});return X}async delete(D,W={}){return this.putAll(new Map([[D,void 0]]),W)}async put(D,W,X={}){return this.putAll(new Map([[D,W]]),X)}async putAll(D,W={}){const X=new C(G,[...D].map(([J,Y])=>[{bucket:J.bucket||this.config.defaultBucket||this.config.defaultManifest.bucket,key:typeof J==="string"?J:J.key},Y])),$=(W?.manifests||[this.config.defaultManifest]).map((J)=>({...this.config.defaultManifest,...J}));return this._putAll(X,{manifests:$})}async _putAll(D,W){const X=new Promise(async($,J)=>{const Y=new Map,Z=[];D.forEach((B,Q)=>{if(B!==void 0){let N=this.config.useVersioning?void 0:H();Z.push(this._putObject({operation:"PUT_CONTENT",ref:Q,value:B,version:N}).then((z)=>{if(this.config.useVersioning)if(z.VersionId===void 0)throw console.error(z),Error(`Bucket ${Q.bucket} is not version enabled!`);else N=z.VersionId;Y.set(Q,N)}))}else Z.push(this._deleteObject({ref:Q}).then((N)=>{Y.set(Q,void 0)}))}),await Promise.all(Z).catch(J),$(Y)});return Promise.all(W.manifests.map(($)=>{return this.getOrCreateManifest($).updateContent(D,X)}))}async _putObject(D){const W=JSON.stringify(D.value,null,2);let X;if(this.config.useVersioning)X={Bucket:D.ref.bucket,Key:D.ref.key,ContentType:"application/json",Body:W,...this.config.useChecksum&&{ChecksumSHA256:await r(W)}};else X={Bucket:D.ref.bucket,Key:`${D.ref.key}${D.version?`@${D.version}`:""}`,ContentType:"application/json",Body:W,...this.config.useChecksum&&{ChecksumSHA256:await r(W)}};const $=await this.s3ClientLite.putObject(X);return console.log(`${this.config.label} ${D.operation} ${X.Bucket}/${X.Key} => ${$.VersionId}`),$}async _deleteObject(D){const W={Bucket:D.ref.bucket,Key:D.ref.key},X=await this.s3ClientLite.deleteObject(W);return console.log(`${this.config.label} ${D.operation||"DELETE"} ${D.ref.bucket}/${D.ref.key} => ${X.VersionId}`),X}subscribe(D,W,X){const $={...this.config.defaultManifest,...X?.manifest},J={key:typeof D==="string"?D:D.key,bucket:D.bucket||this.config.defaultBucket||$.bucket},Y=this.getOrCreateManifest($),Z=Y.subscribe(J,W);return this.get(J,{manifest:$}).then((B)=>{console.log(`${this.config.label} NOTIFY (initial) ${G(J)}`),queueMicrotask(()=>{W(B),Y.poll()})}),Z}refresh(){return Promise.all([...this.manifests.values()].map((D)=>D.poll()))}get subscriberCount(){return[...this.manifests.values()].reduce((D,W)=>D+W.subscriberCount,0)}}export{j0 as MPS3};
