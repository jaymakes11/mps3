var O=(D,F)=>()=>(F||D((F={exports:{}}).exports,F),F.exports);var A=O((J0,g)=>{J0.serialize=function(D){return D&&typeof D.toJSON==="function"?D.toJSON():D}});var p=O((U0,l)=>{var d=A().serialize;l.exports=function D(F,W){if(W=d(W),W===null||typeof W!=="object"||Array.isArray(W))return W;if(F=d(F),F===null||typeof F!=="object"||Array.isArray(F))F={};var X=Object.keys(W);for(var $=0;$<X.length;$++){var B=X[$];if(B==="__proto__"||B==="constructor"||B==="prototype")return F;if(W[B]===null){if(F.hasOwnProperty(B))delete F[B]}else F[B]=D(F[B],W[B])}return F}});var c=O((_0,f)=>{f.exports=function D(F,W){if(F===W)return!0;if(F&&W&&typeof F=="object"&&typeof W=="object"){if(F.constructor!==W.constructor)return!1;var X,$,B;if(Array.isArray(F)){if(X=F.length,X!=W.length)return!1;for($=X;$--!==0;)if(!D(F[$],W[$]))return!1;return!0}if(F.constructor===RegExp)return F.source===W.source&&F.flags===W.flags;if(F.valueOf!==Object.prototype.valueOf)return F.valueOf()===W.valueOf();if(F.toString!==Object.prototype.toString)return F.toString()===W.toString();if(B=Object.keys(F),X=B.length,X!==Object.keys(W).length)return!1;for($=X;$--!==0;)if(!Object.prototype.hasOwnProperty.call(W,B[$]))return!1;for($=X;$--!==0;){var J=B[$];if(!D(F[J],W[J]))return!1}return!0}return F!==F&&W!==W}});var i=O((L0,o)=>{var G0=function(D,F){if(D.length!==F.length)return!1;for(var W=0;W<D.length;W++)if(!Z0(F[W],D[W]))return!1;return!0},Z0=c(),U=A().serialize;o.exports=function D(F,W){if(F=U(F),W=U(W),F===null||W===null||typeof F!=="object"||typeof W!=="object"||Array.isArray(F)!==Array.isArray(W))return W;if(Array.isArray(F)){if(!G0(F,W))return W;return}var X={},$=Object.keys(F),B=Object.keys(W),J,Y,G={};for(Y=0;Y<B.length;Y++)if(J=B[Y],$.indexOf(J)===-1)G[J]=!0,X[J]=U(W[J]);var Q={};for(Y=0;Y<$.length;Y++)if(J=$[Y],B.indexOf(J)===-1)Q[J]=!0,X[J]=null;else if(F[J]!==null&&typeof F[J]==="object"){var z=D(F[J],W[J]);if(z!==void 0)X[J]=z}else if(F[J]!==W[J])X[J]=U(W[J]);return Object.keys(X).length>0?X:void 0}});var t=O((E0,n)=>{n.exports=function D(F,W){if(F===null||W===null||typeof F!=="object"||typeof W!=="object"||Array.isArray(F)!==Array.isArray(W))return W;var X=JSON.parse(JSON.stringify(F));return Object.keys(W).forEach(function($){if(F[$]!==void 0)X[$]=D(F[$],W[$]);else X[$]=W[$]}),X}});async function V(D,F){const W=await crypto.subtle.importKey("raw",typeof D==="string"?E.encode(D):D,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]);return crypto.subtle.sign("HMAC",W,E.encode(F))}async function b(D){return crypto.subtle.digest("SHA-256",typeof D==="string"?E.encode(D):D)}var L=function(D){return Array.prototype.map.call(new Uint8Array(D),(F)=>("0"+F.toString(16)).slice(-2)).join("")},h=function(D){return D.replace(/[!'()*]/g,(F)=>"%"+F.charCodeAt(0).toString(16).toUpperCase())},$0=function(D,F){const{hostname:W,pathname:X}=D;if(W.endsWith(".r2.cloudflarestorage.com"))return["s3","auto"];if(W.endsWith(".backblazeb2.com")){const Y=W.match(/^(?:[^.]+\.)?s3\.([^.]+)\.backblazeb2\.com$/);return Y!=null?["s3",Y[1]]:["",""]}const $=W.replace("dualstack.","").match(/([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(?:\.cn)?$/);let[B,J]=($||["",""]).slice(1,3);if(J==="us-gov")J="us-gov-west-1";else if(J==="s3"||J==="s3-accelerate")J="us-east-1",B="s3";else if(B==="iot")if(W.startsWith("iot."))B="execute-api";else if(W.startsWith("data.jobs.iot."))B="iot-jobs-data";else B=X==="/mqtt"?"iotdevicegateway":"iotdata";else if(B==="autoscaling"){const Y=(F.get("X-Amz-Target")||"").split(".")[0];if(Y==="AnyScaleFrontendService")B="application-autoscaling";else if(Y==="AnyScaleScalingPlannerFrontendService")B="autoscaling-plans"}else if(J==null&&B.startsWith("s3-"))J=B.slice(3).replace(/^fips-|^external-1/,""),B="s3";else if(B.endsWith("-fips"))B=B.slice(0,-5);else if(J&&/-\d$/.test(B)&&!/-\d$/.test(J))[B,J]=[J,B];return[W0[B]||B,J]},E=new TextEncoder,W0={appstream2:"appstream",cloudhsmv2:"cloudhsm",email:"ses",marketplace:"aws-marketplace",mobile:"AWSMobileHubService",pinpoint:"mobiletargeting",queue:"sqs","git-codecommit":"codecommit","mturk-requester-sandbox":"mturk-requester","personalize-runtime":"personalize"},X0=new Set(["authorization","content-type","content-length","user-agent","presigned-expires","expect","x-amzn-trace-id","range","connection"]);class P{constructor({accessKeyId:D,secretAccessKey:F,sessionToken:W,service:X,region:$,cache:B,retries:J,initRetryMs:Y}){if(D==null)throw new TypeError("accessKeyId is a required option");if(F==null)throw new TypeError("secretAccessKey is a required option");this.accessKeyId=D,this.secretAccessKey=F,this.sessionToken=W,this.service=X,this.region=$,this.cache=B||new Map,this.retries=J!=null?J:10,this.initRetryMs=Y||50}async sign(D,F){if(D instanceof Request){const{method:$,url:B,headers:J,body:Y}=D;if(F=Object.assign({method:$,url:B,headers:J},F),F.body==null&&J.has("Content-Type"))F.body=Y!=null&&J.has("X-Amz-Content-Sha256")?Y:await D.clone().arrayBuffer();D=B}const W=new k(Object.assign({url:D},F,this,F&&F.aws)),X=Object.assign({},F,await W.sign());delete X.aws;try{return new Request(X.url.toString(),X)}catch($){if($ instanceof TypeError)return new Request(X.url.toString(),Object.assign({duplex:"half"},X));throw $}}async fetch(D,F){for(let W=0;W<=this.retries;W++){const X=fetch(await this.sign(D,F));if(W===this.retries)return X;const $=await X;if($.status<500&&$.status!==429)return $;await new Promise((B)=>setTimeout(B,Math.random()*this.initRetryMs*Math.pow(2,W)))}throw new Error("An unknown error occurred, ensure retries is not negative")}}class k{constructor({method:D,url:F,headers:W,body:X,accessKeyId:$,secretAccessKey:B,sessionToken:J,service:Y,region:G,cache:Q,datetime:z,signQuery:r,appendSessionToken:e,allHeaders:D0,singleEncode:F0}){if(F==null)throw new TypeError("url is a required option");if($==null)throw new TypeError("accessKeyId is a required option");if(B==null)throw new TypeError("secretAccessKey is a required option");this.method=D||(X?"POST":"GET"),this.url=new URL(F),this.headers=new Headers(W||{}),this.body=X,this.accessKeyId=$,this.secretAccessKey=B,this.sessionToken=J;let K,I;if(!Y||!G)[K,I]=$0(this.url,this.headers);if(this.service=Y||K||"",this.region=G||I||"us-east-1",this.cache=Q||new Map,this.datetime=z||(new Date()).toISOString().replace(/[:-]|\.\d{3}/g,""),this.signQuery=r,this.appendSessionToken=e||this.service==="iotdevicegateway",this.headers.delete("Host"),this.service==="s3"&&!this.signQuery&&!this.headers.has("X-Amz-Content-Sha256"))this.headers.set("X-Amz-Content-Sha256","UNSIGNED-PAYLOAD");const M=this.signQuery?this.url.searchParams:this.headers;if(M.set("X-Amz-Date",this.datetime),this.sessionToken&&!this.appendSessionToken)M.set("X-Amz-Security-Token",this.sessionToken);if(this.signableHeaders=["host",...this.headers.keys()].filter((Z)=>D0||!X0.has(Z)).sort(),this.signedHeaders=this.signableHeaders.join(";"),this.canonicalHeaders=this.signableHeaders.map((Z)=>Z+":"+(Z==="host"?this.url.host:(this.headers.get(Z)||"").replace(/\s+/g," "))).join("\n"),this.credentialString=[this.datetime.slice(0,8),this.region,this.service,"aws4_request"].join("/"),this.signQuery){if(this.service==="s3"&&!M.has("X-Amz-Expires"))M.set("X-Amz-Expires","86400");M.set("X-Amz-Algorithm","AWS4-HMAC-SHA256"),M.set("X-Amz-Credential",this.accessKeyId+"/"+this.credentialString),M.set("X-Amz-SignedHeaders",this.signedHeaders)}if(this.service==="s3")try{this.encodedPath=decodeURIComponent(this.url.pathname.replace(/\+/g," "))}catch(Z){this.encodedPath=this.url.pathname}else this.encodedPath=this.url.pathname.replace(/\/+/g,"/");if(!F0)this.encodedPath=encodeURIComponent(this.encodedPath).replace(/%2F/g,"/");this.encodedPath=h(this.encodedPath);const R=new Set;this.encodedSearch=[...this.url.searchParams].filter(([Z])=>{if(!Z)return!1;if(this.service==="s3"){if(R.has(Z))return!1;R.add(Z)}return!0}).map((Z)=>Z.map((H)=>h(encodeURIComponent(H)))).sort(([Z,H],[v,u])=>Z<v?-1:Z>v?1:H<u?-1:H>u?1:0).map((Z)=>Z.join("=")).join("&")}async sign(){if(this.signQuery){if(this.url.searchParams.set("X-Amz-Signature",await this.signature()),this.sessionToken&&this.appendSessionToken)this.url.searchParams.set("X-Amz-Security-Token",this.sessionToken)}else this.headers.set("Authorization",await this.authHeader());return{method:this.method,url:this.url,headers:this.headers,body:this.body}}async authHeader(){return["AWS4-HMAC-SHA256 Credential="+this.accessKeyId+"/"+this.credentialString,"SignedHeaders="+this.signedHeaders,"Signature="+await this.signature()].join(", ")}async signature(){const D=this.datetime.slice(0,8),F=[this.secretAccessKey,D,this.region,this.service].join();let W=this.cache.get(F);if(!W){const X=await V("AWS4"+this.secretAccessKey,D),$=await V(X,this.region),B=await V($,this.service);W=await V(B,"aws4_request"),this.cache.set(F,W)}return L(await V(W,await this.stringToSign()))}async stringToSign(){return["AWS4-HMAC-SHA256",this.datetime,this.credentialString,L(await b(await this.canonicalString()))].join("\n")}async canonicalString(){return[this.method.toUpperCase(),this.encodedPath,this.encodedSearch,this.canonicalHeaders+"\n",this.signedHeaders,await this.hexBodyHash()].join("\n")}async hexBodyHash(){let D=this.headers.get("X-Amz-Content-Sha256")||(this.service==="s3"&&this.signQuery?"UNSIGNED-PAYLOAD":null);if(D==null){if(this.body&&typeof this.body!=="string"&&!("byteLength"in this.body))throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");D=L(await b(this.body||""))}return D}}var m=(D,F)=>{const W=F.parseFromString(D,"text/xml"),X=W.getElementsByTagName("ListBucketResult")[0],$=W.getElementsByTagName("Contents"),B=W.getElementsByTagName("CommonPrefixes")[0];if(X===null||$===null)throw new Error("Invalid XML");return{$metadata:{},IsTruncated:X.getElementsByTagName("IsTruncated")[0]?.textContent==="true",Contents:Array.from($).map((J)=>({ChecksumAlgorithm:[J.getElementsByTagName("ChecksumAlgorithm")[0]?.textContent],ETag:J.getElementsByTagName("ETag")[0]?.textContent,Key:J.getElementsByTagName("Key")[0]?.textContent,LastModified:new Date(J.getElementsByTagName("LastModified")[0]?.textContent),Owner:{DisplayName:J.getElementsByTagName("DisplayName")[0]?.textContent,ID:J.getElementsByTagName("ID")[0]?.textContent},Size:Number.parseInt(J.getElementsByTagName("Size")[0]?.textContent),StorageClass:J.getElementsByTagName("StorageClass")[0]?.textContent})),Name:W.getElementsByTagName("Name")[0]?.textContent,Prefix:W.getElementsByTagName("Prefix")[0]?.textContent,Delimiter:W.getElementsByTagName("Delimiter")[0]?.textContent,MaxKeys:Number.parseInt(W.getElementsByTagName("MaxKeys")[0]?.textContent),CommonPrefixes:Array.from(B?B.getElementsByTagName("Prefix"):[],(J)=>({Prefix:J?.textContent})),EncodingType:W.getElementsByTagName("EncodingType")[0]?.textContent,KeyCount:Number.parseInt(W.getElementsByTagName("KeyCount")[0]?.textContent),ContinuationToken:W.getElementsByTagName("ContinuationToken")[0]?.textContent,NextContinuationToken:W.getElementsByTagName("NextContinuationToken")[0]?.textContent,StartAfter:W.getElementsByTagName("StartAfter")[0]?.textContent}};class x{client;endpoint;parser;constructor(D,F,W){this.client=D,this.endpoint=F,this.parser=W}async listObjectV2(D){const F=`${this.endpoint}/${D.Bucket}?list-type=2&prefix=${D.Prefix}`,X=await(await this.client.fetch(F,{})).text();return m(X,this.parser)}async putObject(D){const F=`${this.endpoint}/${D.Bucket}/${D.Key}?${new URLSearchParams({...D.ChecksumSHA256&&{"x-amz-content-sha256":D.ChecksumSHA256}}).toString()}}`,W=await this.client.fetch(F,{method:"PUT",body:D.Body});if(W.status!=200)throw new Error(`Failed to PUT: ${await W.text()}`);return{$metadata:{httpStatusCode:W.status},ETag:W.headers.get("ETag"),...W.headers.get("x-amz-version-id")&&{VersionId:W.headers.get("x-amz-version-id")}}}async deleteObject(D){const F=`${this.endpoint}/${D.Bucket}/${D.Key}`;return{$metadata:{httpStatusCode:(await this.client.fetch(F,{method:"DELETE"})).status}}}async getObject(D){const F=`${this.endpoint}/${D.Bucket}/${D.Key}?${D.VersionId?`versionId=${D.VersionId}`:""}`,W=await this.client.fetch(F,{method:"GET",headers:{"If-None-Match":D.IfNoneMatch}});if(W.status==304){const $=new Error;throw $.name="304",$}const X=W.status==404?void 0:await W.json();return{$metadata:{httpStatusCode:W.status},Body:X,ETag:W.headers.get("ETag"),...W.headers.get("x-amz-version-id")&&{VersionId:W.headers.get("x-amz-version-id")}}}}class N{key;_vals;_keys;constructor(D,F){if(this.key=D,this._vals=new Map,this._keys=new Map,F)for(let[W,X]of F)this.set(W,X)}get size(){return this._vals.size}set(D,F){const W=this.key(D);return this._vals.set(W,F),this._keys.set(W,D),this}get(D){return this._vals.get(this.key(D))}delete(D){const F=this.key(D);return this._keys.delete(F),this._vals.delete(F)}has(D){return this._vals.has(this.key(D))}values(){return this._vals.values()}keys(){return this._keys.values()}forEach(D){return this._vals.forEach((F,W,X)=>D(F,this._keys.get(W)))}}var w=()=>`${Date.now()-200}`.padStart(14,"0"),y=()=>`${Date.now()+200}`.padStart(14,"0");var j=()=>crypto.randomUUID();var q=(D)=>`${D.bucket}/${D.key}`;var _=p(),Q0=i(),q0=t();var C={previous:".",files:{},update:{}};class s{ref;handler;lastVersion;queue=Promise.resolve();constructor(D,F){this.ref=D,this.handler=F}notify(D,F,W){this.queue=this.queue.then(()=>W).then((X)=>{if(F===this.lastVersion)return;else console.log(`${D} NOTIFY ${q(this.ref)} ${F}`),this.lastVersion=F,this.handler(X)})}}class S{service;ref;subscribers=new Set;poller;cache;pollInProgress=!1;authoritative_key="";authoritative_state=JSON.parse(JSON.stringify(C));optimistic_state=JSON.parse(JSON.stringify(C));pendingWrites=new Map;writtenOperations=new Map;constructor(D,F,W){console.log("New manifest",F),this.service=D,this.ref=F}observeVersionId(D){if(this.writtenOperations.has(D)){const F=this.writtenOperations.get(D);this.pendingWrites.delete(F),this.writtenOperations.delete(D)}}async get(){return this.getLatest().then((D)=>D||this.cache?.data)}async getLatest(){try{const D=await this.service._getObject({operation:"POLL_TIME",ref:this.ref,ifNoneMatch:this.cache?.etag});if(D.$metadata.httpStatusCode===304)return;if(D.data===void 0)this.authoritative_key=".";else this.authoritative_key=D.data;const F=await this.service.s3ClientLite.listObjectV2({Bucket:this.ref.bucket,Prefix:this.ref.key,StartAfter:this.authoritative_key});if(F.Contents===void 0)return this.authoritative_state=JSON.parse(JSON.stringify(C)),this.optimistic_state=JSON.parse(JSON.stringify(C)),this.authoritative_state;for(let W=F.Contents.length-1;W>=0;W--){const X=F.Contents[W].Key;if(X==this.ref.key)continue;const $=w(),B=await this.service._getObject({operation:"LOOK_BACK",ref:{bucket:this.ref.bucket,key:X}});if(B.data===void 0)throw new Error("empty data");if(B.data.previous<$){this.authoritative_key=B.data.previous,this.authoritative_state=B.data;break}}for(let W=0;W<F.Contents.length;W++){const X=F.Contents[W].Key;if(X==this.ref.key)continue;const $=await this.service._getObject({operation:"SWEEP",ref:{bucket:this.ref.bucket,key:X}}),B=X.substring(X.lastIndexOf("@")+1),J=w();if(X<this.authoritative_key);else if(B>=J)this.optimistic_state=_(this.optimistic_state,$.data?.update);else this.authoritative_state=_(this.authoritative_state,$.data?.update),this.authoritative_key=X;this.observeVersionId(B)}return this.authoritative_state}catch(D){if(D.name==="NoSuchKey")return this.authoritative_state=C,this.authoritative_state;else throw D}}async poll(){if(this.pollInProgress)return;if(this.pollInProgress=!0,this.subscriberCount===0&&this.poller)clearInterval(this.poller),this.poller=void 0;if(this.subscriberCount>0&&!this.poller)this.poller=setInterval(()=>this.poll(),this.service.config.pollFrequency);const D=await this.getLatest();if(D===void 0){this.pollInProgress=!1;return}this.subscribers.forEach(async(F)=>{const W=D.files[q(F.ref)];if(W){const X=this.service._getObject({operation:"GET_CONTENT",ref:F.ref,version:W.version});F.notify(this.service.config.label,W.version,X.then(($)=>$.data))}else if(W===null)F.notify(this.service.config.label,void 0,Promise.resolve(void 0))}),this.pollInProgress=!1}async updateContent(D,F){this.pendingWrites.set(F,D);try{const W=await F,X=await this.get();X.previous=this.authoritative_key,X.update={files:{}};for(let[Y,G]of W){const Q=q(Y);if(G){const z={version:G};X.update.files[Q]=z}else X.update.files[Q]=null}const $=y()+"_"+j().substring(0,2),B=this.ref.key+"@"+$;await this.service._putObject({operation:"PUT_MANIFEST",ref:{key:B,bucket:this.ref.bucket},value:X});const J=await this.service._putObject({operation:"PUT_POLL",ref:{key:this.ref.key,bucket:this.ref.bucket},value:this.authoritative_key});return this.writtenOperations.set($,F),this.poll(),J}catch(W){throw console.error(W),this.pendingWrites.delete(F),W}}async getOptimisticVersion(D){return await this.get(),this.optimistic_state.files[q(D)]?.version}subscribe(D,F){console.log(`SUBSCRIBE ${q(D)} ${this.subscriberCount+1}`);const W=new s(D,F);return this.subscribers.add(W),()=>this.subscribers.delete(W)}get subscriberCount(){return this.subscribers.size}}async function a(D){const F=(new TextEncoder()).encode(D),W=await crypto.subtle.digest("SHA-256",F);return btoa(String.fromCharCode(...new Uint8Array(W)))}class z0{config;s3ClientLite;manifests=new N(q);getCache=new N((D)=>`${D.Bucket}${D.Key}${D.VersionId}${D.IfNoneMatch}`);constructor(D){if(this.config={...D,label:D.label||j().substring(0,3),useChecksum:D.useChecksum===!1?!1:!0,useVersioning:D.useVersioning||!1,pollFrequency:D.pollFrequency||1000,defaultManifest:{bucket:D.defaultManifest?.bucket||D.defaultBucket,key:D.defaultManifest?.key||"manifest.json"}},this.config.s3Config?.credentials instanceof Function)throw Error("We can't do that yet");const F=D.s3Config.endpoint||`https://s3.${D.s3Config.region}.amazonaws.com`;this.s3ClientLite=new x(new P({accessKeyId:this.config.s3Config?.credentials?.accessKeyId,secretAccessKey:this.config.s3Config?.credentials?.secretAccessKey,sessionToken:this.config.s3Config?.credentials?.sessionToken,service:"s3",retries:0}),F,D.parser||new DOMParser)}getOrCreateManifest(D){if(!this.manifests.has(D))this.manifests.set(D,new S(this,D));return this.manifests.get(D)}async get(D,F={}){const W={...this.config.defaultManifest,...F.manifest},X=this.getOrCreateManifest(W),$={bucket:D.bucket||this.config.defaultBucket||this.config.defaultManifest.bucket,key:typeof D==="string"?D:D.key};let B=!1,J=void 0;for(let[G,Q]of X.pendingWrites)if(Q.has($))B=!0,J=Q.get($);if(B)return console.log(`${this.config.label} get (cached) ${q($)}`),J;const Y=await X.getOptimisticVersion($);if(Y===void 0)return;return(await this._getObject({operation:"GET",ref:$,version:Y})).data}async _getObject(D){let F;if(this.config.useVersioning)F={Bucket:D.ref.bucket,Key:D.ref.key,IfNoneMatch:D.ifNoneMatch,...D.version&&{VersionId:D.version}};else F={Bucket:D.ref.bucket,Key:`${D.ref.key}${D.version?`@${D.version}`:""}`,IfNoneMatch:D.ifNoneMatch};if(this.getCache.has(F))return await this.getCache.get(F);const W=this.s3ClientLite.getObject(F).then(async(X)=>{const $={...X,data:X.Body};return console.log(`${this.config.label} ${D.operation} ${D.ref.bucket}/${D.ref.key}@${D.version} => ${$.VersionId} ${$.data}}`),this.getCache.set(F,W),$}).catch((X)=>{if(X?.name==="304")return{$metadata:{httpStatusCode:304},data:void 0};else throw X});return W}async delete(D,F={}){return this.putAll(new Map([[D,void 0]]),F)}async put(D,F,W={}){return this.putAll(new Map([[D,F]]),W)}async putAll(D,F={}){const W=new N(q,[...D].map(([$,B])=>[{bucket:$.bucket||this.config.defaultBucket||this.config.defaultManifest.bucket,key:typeof $==="string"?$:$.key},B])),X=(F?.manifests||[this.config.defaultManifest]).map(($)=>({...this.config.defaultManifest,...$}));return this._putAll(W,{manifests:X})}async _putAll(D,F){const W=new Promise(async(X,$)=>{const B=new Map,J=[];D.forEach((Y,G)=>{if(Y!==void 0){let Q=this.config.useVersioning?void 0:j();J.push(this._putObject({operation:"PUT_CONTENT",ref:G,value:Y,version:Q}).then((z)=>{if(this.config.useVersioning)if(z.VersionId===void 0)throw console.error(z),Error(`Bucket ${G.bucket} is not version enabled!`);else Q=z.VersionId;B.set(G,Q)}))}else J.push(this._deleteObject({ref:G}).then((Q)=>{B.set(G,void 0)}))}),await Promise.all(J).catch($),X(B)});return Promise.all(F.manifests.map((X)=>{return this.getOrCreateManifest(X).updateContent(D,W)}))}async _putObject(D){const F=JSON.stringify(D.value,null,2);let W;if(this.config.useVersioning)W={Bucket:D.ref.bucket,Key:D.ref.key,ContentType:"application/json",Body:F,...this.config.useChecksum&&{ChecksumSHA256:await a(F)}};else W={Bucket:D.ref.bucket,Key:`${D.ref.key}${D.version?`@${D.version}`:""}`,ContentType:"application/json",Body:F,...this.config.useChecksum&&{ChecksumSHA256:await a(F)}};const X=await this.s3ClientLite.putObject(W);return console.log(`${this.config.label} ${D.operation} ${W.Bucket}/${W.Key} => ${X.VersionId}`),X}async _deleteObject(D){const F={Bucket:D.ref.bucket,Key:D.ref.key},W=await this.s3ClientLite.deleteObject(F);return console.log(`${this.config.label} DELETE ${D.ref.bucket}/${D.ref.key} => ${W.VersionId}`),W}subscribe(D,F,W){const X={...this.config.defaultManifest,...W?.manifest},$={key:typeof D==="string"?D:D.key,bucket:D.bucket||this.config.defaultBucket||X.bucket},B=this.getOrCreateManifest(X),J=B.subscribe($,F);return this.get($,{manifest:X}).then((Y)=>{console.log(`${this.config.label} NOTIFY (initial) ${q($)}`),queueMicrotask(()=>{F(Y),B.poll()})}),J}refresh(){return Promise.all([...this.manifests.values()].map((D)=>D.poll()))}get subscriberCount(){return[...this.manifests.values()].reduce((D,F)=>D+F.subscriberCount,0)}}export{z0 as MPS3};
