var tipuesearch = {"pages":[{"url":"./pages/w12/","text":"齒輪繪製 利用漸開線原理, 以 Brython 繪製單一正齒輪廓 (39T) window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 39 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") 兩種正齒輪嚙合的協同繪圖 (17T-11T-13T) from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['3gear'] ctx = canvas.getContext(\"2d\") #齒數 n1 = 17 n2 = 11 n3 = 13 x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*canvas.height/(2*(n1+n2+n3)) pa = 20 #第一齒 r1 = r*n1 x1 = x *0.2+r1 y1 = y ctx.save() ctx.translate(x1, y1) ctx.rotate(math.pi/2) ctx.translate(-x1, -y1) Spur(ctx).Gear(x1, y1, r1, n1, pa, \"blue\") ctx.restore() #第二齒 r2 = r*n2 x2 = x1+r1+r2 y2 = y ctx.save() ctx.translate(x2, y2) ctx.rotate(-math.pi/2-math.pi/n2) ctx.translate(-x2, -y2) Spur(ctx).Gear(x2, y2, r2, n2, pa, \"green\") ctx.restore() #第二齒 r3 = r*n3 x3 = x2+r2+r3 y3 = y ctx.save() ctx.translate(x3, y3) ctx.rotate(-math.pi/2-math.pi/n3+(math.pi+math.pi/n2)*n2/n3) ctx.translate(-x3, -y3) Spur(ctx).Gear(x3, y3, r3, n3, pa, \"black\") ctx.restore()","title":"第十二週","tags":"Course"},{"url":"./pages/about/","text":"2017Spring 機械設計工程系協同產品設計實習 課程倉儲: https://github.com/40423103/2017springcd_hw 課程投影片: http://40423103.github.io/2017springcd_hw 課程網誌: http://40423103.github.io/2017springcd_hw/blog","title":"About","tags":"misc"},{"url":"./w17.html","text":"期末協同查驗與自評 1. 在各自的倉儲中建立一個雙足 solvespace 機構零組件,存入 final 子目錄中","title":"第十七週","tags":"Course"},{"url":"./w12.html","text":"齒輪繪製 利用漸開線原理, 以 Brython 繪製單一正齒輪廓 (39T) window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 39 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") 兩種正齒輪嚙合的協同繪圖 (17T-11T-13T) from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['3gear'] ctx = canvas.getContext(\"2d\") #齒數 n1 = 17 n2 = 11 n3 = 13 x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*canvas.height/(2*(n1+n2+n3)) pa = 20 #第一齒 r1 = r*n1 x1 = x *0.2+r1 y1 = y ctx.save() ctx.translate(x1, y1) ctx.rotate(math.pi/2) ctx.translate(-x1, -y1) Spur(ctx).Gear(x1, y1, r1, n1, pa, \"blue\") ctx.restore() #第二齒 r2 = r*n2 x2 = x1+r1+r2 y2 = y ctx.save() ctx.translate(x2, y2) ctx.rotate(-math.pi/2-math.pi/n2) ctx.translate(-x2, -y2) Spur(ctx).Gear(x2, y2, r2, n2, pa, \"green\") ctx.restore() #第二齒 r3 = r*n3 x3 = x2+r2+r3 y3 = y ctx.save() ctx.translate(x3, y3) ctx.rotate(-math.pi/2-math.pi/n3+(math.pi+math.pi/n2)*n2/n3) ctx.translate(-x3, -y3) Spur(ctx).Gear(x3, y3, r3, n3, pa, \"black\") ctx.restore()","title":"第十二週","tags":"Course"},{"url":"./w10.html","text":"利用 Brython 顯示加減乘除程式結果 1. 將 cdw10 增加為子目錄，導入 add.py，利用 Brython 顯示出來 window.onload=function(){ // 設定 cdw10 為共用程式路徑 brython({debug:1, pythonpath:['./../cdw10']}); } from browser import document as doc from browser import html import math import add container = doc['container'] a=1 b=2 sum=add.add(a,b) container <= str(sum) 程式碼 window.onload=function(){ // 設定 cdw10 為共用程式路徑 brython({debug:1, pythonpath:['./../cdw10']}); } from browser import document as doc from browser import html import math import add container = doc['container'] a=1 b=2 sum=add.add(a,b) container <= str(sum) print(sum) 2. 從 /data/w10 導入加減乘除程式，利用 Brython 顯示 window.onload=function(){ // 設定 cdw10 為共用程式路徑 brython({debug:1, pythonpath:['./../data/w10']}); } from browser import document as doc from browser import html import math import add import times import minus import divide count = doc['count'] a=1 b=2 sum1=add.add(a,b) sum2=minus.minus(a,b) sum3=times.times(a,b) sum4=divide.divide(a,b) count<=str(sum1) count<=str(sum2) count<=str(sum3) count<=str(sum4) 3. 近端加減乘除程式執行影片 國立虎尾科技大學機械設計工程系_ag2-加減乘除 from 劉怡萱 on Vimeo .","title":"第十週","tags":"Course"},{"url":"./github.html","text":"修正Github Github 改版解決方法 到 clone下來的倉儲資料夾 plugin\\liquid_tags 裡面的 Readme.md 檔案 將所有大括號改成兩個 修改後的程式碼 # Liquid-style Tags *Author: Jake Vanderplas <jakevdp@cs.washington.edu>* This plugin allows liquid-style tags to be inserted into markdown within Pelican documents. Liquid uses tags bounded by ``{{% ... %}}``, and is used to extend markdown in other blogging platforms such as octopress. This set of extensions does not actually interface with liquid, but allows users to define their own liquid-style tags which will be inserted into the markdown preprocessor stream. There are several built-in tags, which can be added as follows. First, in your pelicanconf.py file, add the plugins you want to use: PLUGIN_PATH = '/path/to/pelican-plugins' PLUGINS = ['liquid_tags.img', 'liquid_tags.video', 'liquid_tags.youtube', 'liquid_tags.vimeo', 'liquid_tags.include_code', 'liquid_tags.notebook'] There are several options available ## Image Tag To insert a sized and labeled image in your document, enable the ``liquid_tags.img`` plugin and use the following: {{% img [class name(s)] path/to/image [width [height]] [title text | \"title text\" [\"alt text\"]] %}} ### Base64 Image (inline image) tag There is one more tag for image: ``b64img``. It is based on ``img`` tag, but instead of inserting link on image it acutally reads image and inserts it as base64 text into ``<img src=`` attribute. To use it: 1. Enable ``liquid_tags.b64img`` 1. Insert tag as you'd insert image one: ``{{% b64img [class name(s)] path/to/image [width [height]] [title text | \"title text\" [\"alt text\"]] %}}`` Images are read on compilation phase so you can use any local path (just be sure that image will remain there on next compilation) ## Instagram Tag To insert a sized and labeled Instagram image in your document by its shortcode (such as ``pFI0CAIZna``), enable the ``liquid_tags.gram`` plugin and use the following: {{% gram shortcode [size] [width] [class name(s)] [title text | \"title text\" [\"alt text\"]] %}} You can specify a size with `t`, `m`, or `l`. ## Flickr Tag To insert a Flickr image to a post, follow these steps: 1. Enable ``liquid_tags.flickr`` 2. [Get an API key from Flickr](https://www.flickr.com/services/apps/create/apply) 3. Add FLICKR_API_KEY to your config 4. Add this to your document: ``{{% flickr image_id [small|medium|large] [\"alt text\"|'alt text'] %}}`` ## Giphy Tag To insert a gif from Giphy in your document by its id (such as ``aMSJFS6oFX0fC``), enable the ``liquid_tags.giphy`` plugin and use the following: {{% giphy gif_id [\"alt text\"|'alt text'] %}} IMPORTANT: You have to request a production API key from giphy [here](https://api.giphy.com/submit). For the first runs you could also use the public beta key you can get [here](https://github.com/giphy/GiphyAPI). ## Soundcloud Tag To insert a Soundcloud Widget to a post, follow these steps: 1. Enable ``liquid_tags.soundcloud`` 2. Add this to your document: ``{{% soundcloud track_url %}}`` ## Youtube Tag To insert youtube video into a post, enable the ``liquid_tags.youtube`` plugin, and add to your document: {{% youtube youtube_id [width] [height] %}} The width and height are in pixels, and can be optionally specified. If they are not, then the dimensions will be 640 (wide) by 390 (tall). If you're experiencing issues with code generating (i.e. missing closing tags), add `SUMMARY_MAX_LENGTH = None` to your config. ## Vimeo Tag To insert a Vimeo video into a post, enable the ``liquid_tags.vimeo`` plugin, and add to your document: {{% vimeo vimeo_id [width] [height] %}} The width and height are in pixels, and can be optionally specified. If they are not, then the dimensions will be 640 (wide) by 390 (tall). If you're experiencing issues with code generating (i.e. missing closing tags), add `SUMMARY_MAX_LENGTH = None` to your config. ## Video Tag To insert flash/HTML5-friendly video into a post, enable the ``liquid_tags.video`` plugin, and add to your document: {{% video /url/to/video.mp4 [width] [height] [/path/to/poster.png] %}} The width and height are in pixels, and can be optionally specified. If they are not, then the original video size will be used. The poster is an image which is used as a preview of the video. To use a video from file, make sure it's in a static directory and put in the appropriate url. ## Audio Tag To insert HTML5 audio into a post, enable the ``liquid_tags.audio`` plugin, and add to your document: {{% audio url/to/audio [url/to/audio] [url/to/audio] %}} Up to 3 audio urls are possible. So you can add different versions of the audio file you want to post because not every browser support every file format. To use a audio from file, make sure it's in a static directory and put in the appropriate url. ## Include Code To include code from a file in your document with a link to the original file, enable the ``liquid_tags.include_code`` plugin, and add to your document: {{% include_code /path/to/code.py [lang:python] [lines:X-Y] [:hidefilename:] [title] %}} All arguments are optional but their order must be kept. `:hidefilename:` is only allowed if a title is also given. {{% include_code /path/to/code.py lines:1-10 :hidefilename: Test Example %}} This example will show the first 10 lines of the file while hiding the actual filename. The script must be in the ``code`` subdirectory of your content folder: this default location can be changed by specifying CODE_DIR = 'code' within your configuration file. Additionally, in order for the resulting hyperlink to work, this directory must be listed under the STATIC_PATHS setting, e.g.: STATIC_PATHS = ['images', 'code'] ## IPython notebooks To insert an [IPython][] notebook into your post, enable the ``liquid_tags.notebook`` plugin and add to your document: {{% notebook filename.ipynb %}} The file should be specified relative to the ``notebooks`` subdirectory of the content directory. Optionally, this subdirectory can be specified in the config file: NOTEBOOK_DIR = 'notebooks' Because the conversion and rendering of notebooks is rather involved, there are a few extra steps required for this plugin: - First, you will need to install IPython: pip install ipython==2.4.1 - After typing \"make html\" when using the notebook tag, a file called ``_nb_header.html`` will be produced in the main directory. The content of the file should be included in the header of the theme. An easy way to accomplish this is to add the following lines within the header template of the theme you use: {{% if EXTRA_HEADER %}} {{ EXTRA_HEADER }} {{% endif %}} and in your configuration file, include the line: EXTRA_HEADER = open('_nb_header.html').read().decode('utf-8') this will insert the proper css formatting into your document. ### Optional Arguments for Notebook Tags The notebook tag also has two optional arguments: ``cells`` and ``language``. - You can specify a slice of cells to include: ``{{% notebook filename.ipynb cells[2:8] %}}`` - You can also specify the name of a language which Pygments should use for highlighting code cells. A list of the short names for languages that Pygments will highlight can be found [here](http://www.pygments.org/docs/lexers/). ``{{% notebook filename.ipynb language[julia] %}}`` This may be helpful for those using [IJulia](https://github.com/JuliaLang/IJulia.jl) or notebooks in any other language, especially as the IPython project [broadens its scope](https://github.com/ipython/ipython/wiki/Roadmap:-IPython) of [language compatibility](http://jupyter.org/). By default, the language for highlighting will be ``ipython``. - These options can be used separately, together, or not at all. However, if both tags are used then ``cells`` must come before ``language``: ``{{% notebook filename.ipynb cells[2:8] language[julia] %}}`` ### Collapsible Code in IPython Notebooks The plugin also enables collapsible code input boxes. For this to work you first need to copy the file ``pelicanhtml_3.tpl`` (for IPython 3.x, ``pelicanhtml_2.tpl`` (for IPython 2.x)...) to the top level of your Pelican blog. Notebook input cells containing the comment line ``# <!-- collapse=True -->`` will be collapsed when the html page is loaded and can be expanded by clicking on them. Cells containing the comment line ``# <!-- collapse=False -->`` will be open on load but can be collapsed by clicking on their header. Cells without collapse comments are rendered as standard code input cells. ## Testing To test the plugin in multiple environments we use [tox](http://tox.readthedocs.org/en/latest/), to run the entire test suite, just type: \u0002wzxhzdk:0\u0003 [IPython]: http://ipython.org/","title":"Github改版問題","tags":"Course"},{"url":"./w6.html","text":"繪製八連桿並模擬 利用Onshape繪製八連桿並進行模擬 Onshape： https://cad.onshape.com/documents/e64e4499c72a617ab07565a3/w/a195dae8e55c99ed1e147d18/e/a24cb1f9f9b5f16dfcb40d52 繪製影片 國立虎尾科技大學機械設計工程系_40423103 - 八連桿繪製 from 劉怡萱 on Vimeo . 組裝完成","title":"第六週","tags":"Course"},{"url":"./w5.html","text":"單連桿導入V-rep 將單連桿導入V-rep並進行模擬 模擬影片 國立虎尾科技大學機械設計工程系_40423103 - 單連桿導入V-rep from 劉怡萱 on Vimeo .","title":"第五週","tags":"Course"},{"url":"./w4.html","text":"Start.bat 設定 修改 Start.bat，讓批次檔可以在開啟時自動搜尋電腦 IP 然後修改 stunnel.conf 並開啟 fossil 倉儲 最後會開啟課程投影片、課程 fosill 倉儲、課程 Vimeo、課程部落格，我後來改成開小組 fossil 和課程部落格 chrome https://%NetworkIP% https://mde2a2.kmol.info/cdag2/home http://mde.tw/2017springwcm/blog/ Exit 設定影片 Start.bat 設定 from 劉怡萱 on Vimeo .","title":"第四週","tags":"Course"},{"url":"./w3.html","text":"Hyperworks 逐字稿 (1&3) Hyperworks1 逐字稿 In the 2017 release, we followed our vision and implement a lot more features, delivering more technology for your HyperWorks units investment. In our continuous development, we focused, as always, on simulation-driven innovation, adding more optimization technology. We added more physics simulation to the software, and we improved our parallel performance on high performance computers. OptiStruct, which is our implicit code, adds a lot of development in the nonlinear implicit area, but also in the optimization technology. RADIOSS, we see a lot of development in new materials and material modeling. You probably know that we did the acquisition of MDS a couple of years back, and we have now MDS integrated with RSDIOSS, and are doing application there. MotionSolve is based on a very unique formulation that this different from other multibody dynamics code, and the MotionSolve formulation lends itself very well to optimization implementation. So the team has worked really hard on contact formulations, got very robust. It's very cool which kind of problems can solve with contact modelling. So this is along the structural solvers side on AcuSolve side we actually added the complete portfolio of turbulence and transition models that really helps us to solve problems in wind turbines and automotive industry much more accurately, and it's a big asset of physics simulation. And then our electromagnetic suite has actually grown last year through the acquisition of Flux, from the CEDRAT company. As well as the acquisition of WinProp, from AWE. So now we have a complete frequency spectrum from low frequency electromagnetics the high frequency electromagnetics which is powered by FEKO. We now have a complete portfolio of physics modeling available for our customers, and it's all linked through optimization. In the 2017 release, we followed our vision and implement a lot more features, delivering more technology for your HyperWorks units investment. In our continuous development, we focused, as always, on simulation-driven innovation, adding more optimization technology. We added more physics simulation to the software, and we improved our parallel performance on high performance computers. OptiStruct, which is our implicit code, adds a lot of development in the nonlinear implicit area, but also in the optimization technology. RADIOSS, we see a lot of development in new materials and material modeling. You probably know that we did the acquisition of MDS a couple of years back, and we have now MDS integrated with RSDIOSS, and are doing application there. MotionSolve is based on a very unique formulation that this different from other multibody dynamics code, and the MotionSolve formulation lends itself very well to optimization implementation. So the team has worked really hard on contact formulations, got very robust. It's very cool which kind of problems can solve with contact modelling. So this is along the structural solvers side on AcuSolve side we actually added the complete portfolio of turbulence and transition models that really helps us to solve problems in wind turbines and automotive industry much more accurately, and it's a big asset of physics simulation. And then our electromagnetic suite has actually grown last year through the acquisition of Flux, from the CEDRAT company. As well as the acquisition of WinProp, from AWE. So now we have a complete frequency spectrum from low frequency electromagnetics the high frequency electromagnetics which is powered by FEKO. We now have a complete portfolio of physics modeling available for our customers, and it's all linked through optimization. Hyperworks3 逐字稿 In OptiStruct, one of our focus areas is nonlinear large deformation analysis. And in 2017 we added nonlinear transient analysis. The main purpose was to couple AcuSolve to do fluid-structure interaction. But also one development that happened during the last year. Came out piece-wise in different point releases. And is now really mature. And 2017 is our contact analysis. So we have different ways of defining large sliding contact and things like that. The fast contact analysis for small deformation is blazing fast. It's a very simple idea that makes the solution very fast, and that adds OptiStruct as really a leading nonlinear . Our two major optimization packages are OptiStruct for structural optimization, there's a huge multidisciplinary component, too. And Hyperstudy for general optimization wrap around multidisciplinary optimization. OptiStruct we spend a lot of time continuing the development for optimization. And we have now Failsafe topology optimization. We kept on working on the manufacturing solution to do lattice optimization. For the multi-model optimization it's really maturing and we find more and more applications where that helps . Our goal is actually to include all the physics in the optimizations. So the team right now is working on optimization for nonlinear problems and so on And then Hyperstudy, on the other hand, is going through a new transformation of the user the user experience was changed a few years back, but we are now trying to make it much more easy to use by hiding a lot of the advanced functionalities to the regular users. And depending on the level of expertise or depending on the job that the user has to do, they can customize the userience. We adds a few new connections. One of them is a Flux connection. Flux is an electromagnetics code that we just acquired for low frequency electromagnetics, so we can all take a Flux database and put it into Hyperstudy into the study with that.","title":"第三週","tags":"Course"},{"url":"./w2.html","text":"繪製四連桿機構，並導入V-rep 先利用SolveSpace繪製四連桿機構，再導入V-rep進行動態模擬 1. 30桿鍵 2. 50桿鍵 3. 60桿鍵 4. 組裝 繪製影片 四連桿 from 劉怡萱 on Vimeo .","title":"第二週","tags":"Course"},{"url":"./w1.html","text":"下載新版可攜程式系統，設定Stunnel.conf 1. 下載 可攜程式系統 (1GB) 2. 設定 Stunnel.conf 的 IP 設定影片 Stunnel from 劉怡萱 on Vimeo .","title":"第一週","tags":"Course"}]};