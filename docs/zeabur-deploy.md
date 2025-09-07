# Zeabur托管服务部署DevTools

1. 配置next-auth认证提供商以获得管理后台的管理员访问权限。
2. 在zeabur上创建一个项目，在项目中逐个添加下面的服务：
   1. devtools-main：从`https://github.com/dante-is-shipping/devtools`github仓库中添加，根目录填`packages/devtools`。
2. devtools-crawler：从`https://github.com/dante-is-shipping/devtools`github仓库中添加，根目录填`packages/crawler`。
   3. Redis：从预构建镜像中添加。
   4. MongoDB：从预构建镜像中添加。
   5. MinIO：从预构建镜像中添加。
  
    
    也可以直接通过下面的模版创建项目，然后进行后面的配置：
  [![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/9PSGFO?referralCode=dante-is-shipping)

4. 配置MinIO服务的网络，为web和console生成对应的域名。web端域名用于访问图片，console端的域名用于管理MinIO。从环境变量中查看MinIO的用户名密码，并从console端进入管理后台。进入管理后台后，创建一个`images`bucket，用来存储图片。再配置该bucket的匿名访问模式为可读。最后生成一个apiKey。
5. 配置devtools-main服务的网络，生成一个域名，这个域名是DevTools服务的域名，也可以自定一个域名。
6. 配置devtools-crawler的环境变量：
   ```
    PORT=13000
    IMAGE_STORAGE=minio
    REDIS_HOST=redis.zeabur.internal
    REDIS_PORT=6379
    REDIS_DB=0
    MINIO_PORT=9000
    REDIS_PASS=${REDIS_PASSWORD}
    MONGODB_URI=${MONGO_CONNECTION_STRING}
    MINIO_ENDPOINT=minio.zeabur.internal
    MINIO_BUCKET=images

    # 上面为默认的配置，不需要修改。下面是需要配置的部分👇

    # openai base url
    OPENAI_BASEURL=https://api.openai.com/v1
    # openai key
    OPENAI_KEY=xxxxxx
    # openai model
    OPENAI_MODEL=xxxxxx
        
    # minio服务web端请求base地址，例如：https://tools-shipnowkit-images.zeabur.app
    MINIO_BASE=xxx
    # minio access key
    MINIO_ACCESS_KEY=xxx
    # minio secret key
    MINIO_SECERT_KEY=xxx

    # devtools-crawler服务的认证用户名、密码
    AUTH_USER=xxx
    AUTH_PASSWORD=xxx
    ```
7. 配置devtools-main的环境变量：
    ```
    CRAWLER_GATEWAY=http://devtools-crawler.zeabur.internal:8080
    MONGODB_URI=${MONGO_CONNECTION_STRING}
    MINIO_ENDPOINT=minio.zeabur.internal
    NEXT_PUBLIC_IMAGE_STORAGE=minio
    MINIO_BUCKET=images
    MINIO_PORT=9000

    # 上面为默认的配置，不需要修改。下面是需要配置的部分👇

    # 网站地址
    NEXT_PUBLIC_APP_URL=xxx

    # next-auth配置 (根据需要配置认证提供商)
    # NEXTAUTH_SECRET=xxx
    # NEXTAUTH_URL=xxx
    
    # minio服务web端请求base地址，例如：https://tools-shipnowkit-images.zeabur.app
    MINIO_BASE=xxx
    # minio access key
    MINIO_ACCESS_KEY=xxx
    # minio secret key
    MINIO_SECERT_KEY=xxx
    

    # 后台管理员ID
    NEXT_PUBLIC_MANAGER_USER=xxx
    
    
    # 网站名
    NEXT_PUBLIC_APP_NAME=xxx
    # 网站作者
    NEXT_PUBLIC_APP_GENERATOR=xxx
    NEXT_PUBLIC_APP_GENERATOR_URL=xxx

    # devtools-crawler服务的认证用户名、密码
    CRAWLER_AUTH_USER=xxx
    CRAWLER_AUTH_PASSWORD=xxx
    ```
8. 重新部署devtools-main和devtools-crawler